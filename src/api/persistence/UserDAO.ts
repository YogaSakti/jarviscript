import UserDTO from "../dtos/UserDTO";
import User from "../models/User";
import ValidationError from "../errors/ValidationError";
import { Error } from "mongoose";

export default {
  async create(userDTO: UserDTO) {
    try {
      const user = new User(userDTO);
      await user.save();
      let newUser = { ...user.toObject() };
      delete newUser.password;
      return newUser;
    } catch (error) {
      if (
        error instanceof Error.ValidationError ||
        error.code === 11000 ||
        error.code === 11001
      )
        throw new ValidationError(error);
    }
  },
};
