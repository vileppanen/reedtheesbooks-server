export interface ErrorObject {
  errorMessage: string
  status: number
}

export class ClientError implements ErrorObject {
  errorMessage: string
  status: number
  constructor(message: string, status: number) {
    this.errorMessage = message
    this.status = status
  }
}