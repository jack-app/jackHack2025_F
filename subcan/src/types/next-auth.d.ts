import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    uid: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean;
    idToken: string;
    refreshToken: string;
    tokenExpiryTime: number;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      uid: string;
      name: string;
      email: string;
      image: string;
      emailVerified: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    uid: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean;
    idToken: string;
    refreshToken: string;
    tokenExpiryTime: number;
  }
}
