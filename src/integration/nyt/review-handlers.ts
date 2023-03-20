
import { getJson } from '../../utils/http'
import { API_BASE_PATH, API_KEY_QSP } from "./constants"
import { ImmutableQueryResultsArray, NytBookReview } from "./external-types"


export const queryReviews = async (isbn: string) => {
  const ISBN_QSP=`isbn=${isbn}`
  const response = await getJson<ImmutableQueryResultsArray<NytBookReview>>(`${API_BASE_PATH}/reviews.json?${API_KEY_QSP}&${ISBN_QSP}`)
  return response.results.map(toReview)
}
const toReview = (nytBookReview: NytBookReview) => ({
  byLine: nytBookReview.byline,
  url: nytBookReview.url
})