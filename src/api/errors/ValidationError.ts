import FieldError from "../interfaces/FieldError";

export default class ValidationError extends Error {
  public errors: Array<FieldError>;

  constructor(error: any) {
    super();

    this.errors = [];
    if (error.code === 11000 || error.code === 11001) {
      let fields: Array<string> = Object.keys(error.keyValue);
      fields.forEach((field) => {
        this.errors.push({
          field,
          message: `This \`${field}\` has already been taken.`,
        });
      });
    } else {
      let fields: Array<string> = Object.keys(error.errors);
      fields.forEach((field) => {
        this.errors.push({
          field,
          message: error.errors[field].message,
        });
      });
    }
  }
}
