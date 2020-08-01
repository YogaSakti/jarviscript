import { Document } from "mongoose";

export default interface UserDTO extends Document {
  name: string;
  username: string;
  email: string;
  whatsapp: string;
  password: string;
  createAccessToken(): string;
  comparePassword(password: string): Promise<boolean>;
}
