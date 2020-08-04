export default class MPVError extends Error {
  public errorCode: number;
  public message: string;
  public stackTrace: string;
  public arguments: string;
  public method: string;

  constructor(error: any) {
    super();
    this.errorCode = error.errcode;
    this.message = error.verbose;
    this.stackTrace = error.stackTrace;
    this.arguments = error.arguments;
    this.method = error.method;

    if (error instanceof TypeError) {
      this.errorCode = 99;
      this.message = "Instance not created! Need to call method create";
    }
  }
}
