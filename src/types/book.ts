import { Review } from "./review"

export type Book = {
  title: string
  author: string
  rank: number
  isbn10: string
  isbn13: string
  reviews?: Array<Review>
}