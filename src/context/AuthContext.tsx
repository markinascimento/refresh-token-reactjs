import { AuthServices, type ISignInDTO } from "@/services/AuthServices";
import { createContext, useCallback, useState, type ReactNode } from "react";

interface AuthContextProps {
  signedIn: boolean;
  signOut(): void;
  signIn(user: ISignInDTO): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const signIn = useCallback(async ({ email, password }: ISignInDTO) => {
    if (!password) {
      throw new Error("Password is required");
    }

    if (email !== "marcos@gmail.com") {
      throw new Error("User not found");
    }
    setSignedIn(true);
    await AuthServices.signIn({ email, password });
    return;
  }, []);

  const signOut = useCallback(() => {
    setSignedIn(false);
  }, [setSignedIn]);

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
