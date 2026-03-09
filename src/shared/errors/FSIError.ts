export class FSIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "FSIError"
  }
}
