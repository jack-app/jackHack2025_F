import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth as firebaseAuth } from "./firebase";
import {
  signIn as signInWithNextAuth,
  signOut as signOutWithNextAuth,
} from "next-auth/react";

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();

  signInWithPopup(firebaseAuth, provider)
    .then(async ({ user }) => {
      if (user) {
        const refreshToken = user.refreshToken;
        const idToken = await user.getIdToken();
        await signInWithNextAuth("credentials", {
          idToken,
          refreshToken,
          callbackUrl: `/`,
        });
      }
    })
    .catch((error) => {
      console.error("Error Sing In with Google", error);
    });
}

export function logout() {
  firebaseAuth
    .signOut()
    .then(() => {
      signOutWithNextAuth({ callbackUrl: `/auth/login` }); //ログアウト後に遷移する画面の指
    })
    .catch((error) => {
      console.error("Error Sign Out with Google", error);
    });
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    if (user) {
      const idToken = await user.getIdToken();
      const refreshToken = user.refreshToken;

      await signInWithNextAuth("credentials", {
        idToken,
        refreshToken,
        callbackUrl: `/`,
      });
    }
  } catch (error) {
    console.error("Error Sign In with Email", error);
    // 必要に応じてエラーメッセージを投げる
    throw error;
  }
}
