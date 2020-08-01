export default class AuthenticationError extends Error {
  public errors: string;
  constructor(message: string = "") {
    super();
    this.errors = message;
  }
}
