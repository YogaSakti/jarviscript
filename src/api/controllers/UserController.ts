import { Request, Response } from "express";
import UserDTO from "../dtos/UserDTO";
import UserDAO from "../persistence/UserDAO";
import JwtDTO from "../dtos/JwtDTO";
import AuthService from "../services/AuthService";

export default {
  async create(req: Request, res: Response) {
    try {
      let userDTO: UserDTO = <UserDTO>req.body;
      return res.status(201).json(await UserDAO.create(userDTO));
    } catch (error) {
      return res.status(400).json({ errors: error.errors });
    }
  },

  async login(req: Request, res: Response) {
    try {
      let userDTO: UserDTO = <UserDTO>req.body;
      const auth = new AuthService();
      const jwt: JwtDTO = {
        token: await auth.authenticateUser(userDTO.username, userDTO.password),
      };
      return res.status(200).json(jwt);
    } catch (error) {
      return res.status(403).json(error.errors);
    }
  },
};
