interface ILoginUserDTO {
  username: string;
  password: string;
}

export default class LoginUserDTO implements ILoginUserDTO {
  username: string;
  password: string;

  constructor({ username, password }: ILoginUserDTO) {
    this.username = username;
    this.password = password;
  }
}
