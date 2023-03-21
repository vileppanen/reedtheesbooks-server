import { Review } from "./review"

export type Book = {
  title: string
  author: string
  rank: number
  isbn10: string | null
  isbn13: string | null
  reviews?: Array<Review>
}