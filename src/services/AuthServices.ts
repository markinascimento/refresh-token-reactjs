import { httpClient } from "./httpClient";

export interface ISignInDTO {
  email: string;
  password: string;
}

interface ISignInResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export class AuthServices {
  static async signIn({ email, password }: ISignInDTO) {
    const { data } = await httpClient.post<ISignInResponseDTO>('/signin', { 
      email, password 
    })
    return data
  }

  static async refreshToken(refreshToken: string) {
    const { data } = await httpClient.post<ISignInResponseDTO>('/refresh-token', {
      refreshToken
    })
    return data
  }
}
