export interface ISignInDTO {
  email: string;
  password: string;
}

export class AuthServices {
  static async signIn({ email, password }: ISignInDTO) {
    console.log({ email, password });
  }
}
