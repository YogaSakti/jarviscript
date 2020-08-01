interface IRegisterUserDTO {
  name: string;
  username: string;
  email: string;
  whatsapp: string;
  password: string;
}

export default class RegisterUserDTO implements IRegisterUserDTO {
  public name: string;
  public username: string;
  public email: string;
  public whatsapp: string;
  public password: string;

  constructor(iRegisterUserDTO: IRegisterUserDTO) {
    this.name = iRegisterUserDTO.name;
    this.username = iRegisterUserDTO.username;
    this.email = iRegisterUserDTO.email;
    this.whatsapp = iRegisterUserDTO.whatsapp;
    this.password = iRegisterUserDTO.password;
  }
}
