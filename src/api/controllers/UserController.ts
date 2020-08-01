import { Request, Response } from "express";
import UserDAO from "../persistence/UserDAO";
import AuthService from "../services/AuthService";

import JwtDTO from "../dtos/JwtDTO";
import UserDTO from "../dtos/UserDTO";
import LoginUserDTO from "../dtos/LoginUserDTO";
import RegisterUserDTO from "../dtos/RegisterUserDTO";
import AuthenticationError from "../errors/AuthenticationError";

export default {
  async create(req: Request, res: Response) {
    try {
      let registerUserDTO = new RegisterUserDTO(req.body);
      return res.status(201).json(await UserDAO.create(registerUserDTO));
    } catch (error) {
      return res.status(400).json({ errors: error.errors });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const loginUserDTO = new LoginUserDTO(req.body);
      const auth = new AuthService();

      const token = await auth.authenticateUser(loginUserDTO);
      return res.status(200).json(new JwtDTO(token));
    } catch (error) {
      if (error instanceof AuthenticationError)
        return res.status(403).json(error.errors);
      return res.status(500).send("Server error");
    }
  },
};
