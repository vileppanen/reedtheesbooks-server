type QueryResultsBase = {
  status: string
  copyright: string
  num_results: number
  last_modified: string
}

export type QueryResultsArray<TResultsType> = QueryResultsBase & {
  results: Array<TResultsType>
}
export type ImmutableQueryResultsArray<TResultsType> = Omit<QueryResultsArray<TResultsType>, 'last_modified'>

export type QueryResultsMap<TResultsType> = QueryResultsBase & {
  results: TResultsType
}
export type ImmutableQueryResultsMap<TResultsType> = Omit<QueryResultsMap<TResultsType>, 'last_modified'>

export type NytBookList = {
  list_name: string
  display_name: string
  list_name_encoded: string
  oldest_published_date: string
  newest_published_date: string
  updated: string
}

export type NytBookListDetails = {
  list_name: string
  bestsellers_date: string
  published_date: string
  display_name: string
  normal_list_ends_at: number
  updated: string
  books: Array<NytBook>
}

export type NytBook = {
  rank: number
  primary_isbn10: string
  primary_isbn13: string
  title: string
  author: string
}

export type NytBookReview = {
  url: string
  publication_dt: string
  byline: string
  book_title: string
  book_author: string
  summary: string
  uuid: string
  uri: string
  isbn13: Array<string>
}
