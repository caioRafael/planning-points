import { getAuth, signInWithPopup, GoogleAuthProvider, User, ErrorFn, AuthError } from "firebase/auth";
import { app } from "./firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export interface IAuth {
  user?: User;
  token?: string;
}

export const signInGoogle = async (): Promise<IAuth> => {
  let user: User | undefined, token: string | undefined

  try {
    const result = await signInWithPopup(auth, provider)

    const credential = GoogleAuthProvider.credentialFromResult(result);
    token = credential?.accessToken;
    user = result.user;

    if (!token || !user) {
      throw new Error('Erro ao entrar com o Google')
    }

    sessionStorage.setItem('@AuthFirebase:token', token);
    sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));

  } catch (err: any) {
    const error = err as AuthError
    if (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
    console.log(err)
  }


  return {
    user,
    token
  }
}