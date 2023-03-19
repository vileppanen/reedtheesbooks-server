export const getErrorMessage = (status: number, attempt: number, additionalText: string = ''): string => {
  return `Attempt ${attempt}: Request failed with status ${status}${additionalText}`
}