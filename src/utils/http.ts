import fetch from 'node-fetch'
import { getErrorMessage } from './errors'
import { waitForSeconds } from './general'


const RETRYABLE_STATUSES = [429]
const BACKOFF_SECONDS = 3
const MAX_ATTEMPTS = 3

export async function getJson<ResultType>(url: string, attempt: number = 1): Promise<ResultType> {
  const response = await fetch(url)
  if (response.ok) { return response.json() }
  else if (requestCanBeRetried(response.status, attempt)) {
    return await retryRequest(url, attempt, response.status)
  }
  else {
   return handleNonRetryableError(response.status, attempt)
  }
}

async function retryRequest<ResultType>(url: string, currentAttempt: number, status: number): Promise<ResultType> {
  console.error(getErrorMessage(status, currentAttempt, ' - [retrying after backoff period]'))
  await waitForSeconds(currentAttempt * BACKOFF_SECONDS)
  return await getJson(url, currentAttempt+1)
}

const requestCanBeRetried = (status: number, attempt: number) => RETRYABLE_STATUSES.includes(status) && attempt <= MAX_ATTEMPTS

const handleNonRetryableError = (status: number, attempt: number) => {
  const errorMessage = getErrorMessage(status, attempt)
  console.error(errorMessage)
  throw new Error(errorMessage)
}
