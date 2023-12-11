export class LoginDto {
  username: string
  password: string
  // type?: string;

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}
