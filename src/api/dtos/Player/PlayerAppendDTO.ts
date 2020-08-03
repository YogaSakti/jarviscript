interface IPlayerAppendDTO {
  query: string;
}

export default class PlayerAppendDTO implements IPlayerAppendDTO {
  public query: string;
  constructor({ query }: IPlayerAppendDTO) {
    this.query = query;
  }
}
