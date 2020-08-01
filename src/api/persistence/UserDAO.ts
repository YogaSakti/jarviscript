import RegisterUserDTO from "../dtos/RegisterUserDTO";
import User from "../models/User";
import UserDTO from "../dtos/UserDTO";
import ValidationError from "../errors/ValidationError";
import { Error } from "mongoose";

export default {
  async create(registerUserDTO: RegisterUserDTO) {
    try {
      const user = new User(registerUserDTO);
      await user.save();
      return new UserDTO(user);
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
