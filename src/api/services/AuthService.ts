import User from "../models/User";
import AuthenticationError from "../errors/AuthenticationError";
import UserDTO from "../dtos/UserDTO";
import LoginUserDTO from "../dtos/LoginUserDTO";

export default class AuthService {
  constructor() {}

  async authenticateUser({
    username,
    password,
  }: LoginUserDTO): Promise<string> {
    const user = await User.findOne({ username });
    if (!user)
      throw new AuthenticationError("Password and/or username incorrect.");
    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      throw new AuthenticationError("Password and/or username incorrect.");

    return user.createAccessToken();
  }
}
