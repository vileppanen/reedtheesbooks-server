import chunk from 'lodash/chunk'
import { API_KEY_QSP } from './constants'
import { queryReviews } from './review-handlers'
import { NytBookList, NytBookListDetails, NytBook, ImmutableQueryResultsArray, QueryResultsMap } from './external-types'
import { waitForSeconds } from '../../utils/general'
import { BookType } from '../../types/booktype'
import { Book } from '../../types/book'
import { getJson } from '../../utils/http'


export const queryBookTypes = async (): Promise<Array<BookType>> => {
  const response = await getJson<ImmutableQueryResultsArray<NytBookList>>(`https://api.nytimes.com/svc/books/v3/lists/names.json?${API_KEY_QSP}`)
  return response.results.map(toBookType)
}
const toBookType = (nytBookList: NytBookList): BookType => ({
  code: nytBookList.list_name_encoded,
  name: nytBookList.display_name
})

export const queryBooksForType = async (bookTypeCode: string): Promise<Array<Book>> => {
  const response = await getJson<QueryResultsMap<NytBookListDetails>>(`https://api.nytimes.com/svc/books/v3/lists/current/${bookTypeCode}.json?${API_KEY_QSP}`)
  return response.results.books.map(toBook)
}
const toBook = (nytBook: NytBook) => ({
  title: nytBook.title,
  author: nytBook.author,
  rank: nytBook.rank,
  isbn10: nytBook.primary_isbn10,
  isbn13: nytBook.primary_isbn13
})


export const queryTop10BooksForTypeWithReviews = async (bookTypeCode: string): Promise<Array<Book>> => {
  const books = await queryBooksForType(bookTypeCode)
  const top10Books = books.sort(byBookRank).slice(0, 10)
  
  return await getBooksWithReviewsIncluded(top10Books)
}
const byBookRank = (book: Book, nextBook: Book) => book.rank - nextBook.rank

const getBooksWithReviewsIncluded = async (books: Array<Book>) => {
  const reviewInclusionBatches = chunk(books.map(withReviews), 3)
  
  let booksWithReviews: Array<Book> = []
  for (let reviewInclusionBatch of reviewInclusionBatches) {
    const nextSetOfBooksWithReviews = await Promise.all(reviewInclusionBatch)

    booksWithReviews = [...booksWithReviews, ...nextSetOfBooksWithReviews]
    await waitForSeconds(2)
  }

  return booksWithReviews
}

const withReviews = async (book: Book): Promise<Book> => {
  try {
    const reviews = await queryReviews(book.isbn10)
    return {
      ...book,
      reviews
    }
  } catch (err: any) {
    console.error(`Could not retrieve reviews for book ${book.isbn10}: ${err.message}`)
    return book
  }
}


