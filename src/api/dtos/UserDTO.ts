interface IUserDTO {
  name: string;
  username: string;
  email: string;
  whatsapp?: string;
}

export default class UserDTO implements IUserDTO {
  name: string;
  username: string;
  email: string;
  whatsapp?: string;

  constructor(iUserDTO: IUserDTO) {
    this.name = iUserDTO.name;
    this.username = iUserDTO.username;
    this.email = iUserDTO.email;
    this.whatsapp = iUserDTO.whatsapp;
  }
}
