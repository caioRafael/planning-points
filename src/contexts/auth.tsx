import { User } from "firebase/auth";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { signInGoogle } from "../service/auth";

interface AuthGoogleProviderProps {
  children: ReactNode
}

interface IAuthGoogleContext {
  handleSignIn: () => void;
  signed: boolean
}

export const AuthGoogleContext = createContext<IAuthGoogleContext>({
  handleSignIn: () => { },
  signed: false,
})

export const AuthGoogleProvider: FC<AuthGoogleProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = async () => {
    const { user } = await signInGoogle()
    if (user) {
      setUser(user)
    }
  }

  const loadStorageAuth = () => {
    const sessionToken = sessionStorage.getItem('@AuthFirebase:token')
    const sessionUser = sessionStorage.getItem('@AuthFirebase:user')

    if (sessionToken && sessionUser) {
      setUser(JSON.parse(sessionUser))
    }
  }

  useEffect(() => {
    loadStorageAuth()
  }, [])

  return (
    <AuthGoogleContext.Provider
      value={{
        handleSignIn,
        signed: !!user,
      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  )
}