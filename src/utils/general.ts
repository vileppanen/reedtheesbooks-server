export const waitForSeconds = (seconds: number) => new Promise(resolve => {
  const SECONDS_AS_MS = seconds * 1000
  setTimeout(resolve, SECONDS_AS_MS)
})
