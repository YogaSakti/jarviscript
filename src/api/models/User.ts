import mongoose, { Schema } from "mongoose";
import UserDTO from "../dtos/UserDTO";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  whatsapp: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  // @ts-ignore
  const user: IUser = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.createAccessToken = function (this: UserDTO) {
  const token = jwt.sign(this.toJSON(), process.env.JWT_SECRET);
  return token;
};

UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  });
};

export default mongoose.model<UserDTO>("User", UserSchema);
