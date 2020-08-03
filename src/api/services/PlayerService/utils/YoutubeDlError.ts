export default class YotubueDlError extends Error {
  public message: string;

  constructor(error: Error) {
    super();
    this.message = error.message;
  }
}
