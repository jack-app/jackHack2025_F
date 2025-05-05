import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

const certInfo: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const firebaseAdmin =
  admin.apps[0] ??
  admin.initializeApp({
    credential: admin.credential.cert(certInfo),
  });

export const firebaseAdminAuth = firebaseAdmin.auth();
