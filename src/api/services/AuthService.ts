import User from "../models/User";
import AuthenticationError from "../errors/AuthenticationError";

export default class AuthService {
  constructor() {}

  async authenticateUser(username: string, password: string): Promise<string> {
    const user = await User.findOne({ username });
    if (!user)
      throw new AuthenticationError("Password and/or username incorrect.");
    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      throw new AuthenticationError("Password and/or username incorrect.");

    return user.createAccessToken();
  }
}
