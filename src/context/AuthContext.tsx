// -> ReactJS
import {
  createContext, useCallback, useLayoutEffect, useState, type ReactNode
} from "react";

// -> API
import { AuthServices, type ISignInDTO } from "@/services/AuthServices";

// -> Http client
import { httpClient } from "@/services/httpClient";

// -> Constants
import { storageKeys } from "@/config/storageKeys";

interface AuthContextProps {
  signedIn: boolean;
  signOut(): void;
  signIn(user: ISignInDTO): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storegedAccessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN);
    return !!storegedAccessToken;
  });

  const signIn = useCallback(async ({ email, password }: ISignInDTO) => {
    try {
      const {
        accessToken, refreshToken
      } = await AuthServices.signIn({ email, password });

      setSignedIn(true)

      localStorage.setItem(storageKeys.ACCESS_TOKEN, accessToken);
      localStorage.setItem(storageKeys.REFRESH_TOKEN, refreshToken);

    } catch (error){
      console.log({ error })
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear()
    setSignedIn(false);
  }, [setSignedIn]);

  useLayoutEffect(() => {
    const interceptorId = httpClient.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.getItem(storageKeys.ACCESS_TOKEN);
    
        if (accessToken) {
          config.headers.set("Authorization", `Bearer ${accessToken}`);
        }
    
        return config;
      }
    );

    return () => {
      httpClient.interceptors.request.eject(interceptorId)
    }
  }, [])
  
  useLayoutEffect(() => {
    const interceptorId =  httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem(storageKeys.REFRESH_TOKEN);
        const deslogedUserBy = originalRequest.url === '/refresh-token'
    
        if(
          (error.response && error?.response?.status !== 401) || 
          !refreshToken ||
          deslogedUserBy
        ) {
          signOut()
          return; 
        } 
         
        const {
          accessToken,
          refreshToken: newRefreshToken
        } = await AuthServices.refreshToken(refreshToken)
    
        localStorage.setItem(storageKeys.ACCESS_TOKEN, accessToken);
        localStorage.setItem(storageKeys.REFRESH_TOKEN, newRefreshToken);
    
        return httpClient(originalRequest)
      }
    )

    return () => {
      httpClient.interceptors.response.eject(interceptorId)
    }
  }, [signOut]);

  return (
    <AuthContext.Provider value={{ signedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
