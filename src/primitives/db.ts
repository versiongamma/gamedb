import admin from "firebase-admin";
import { ServiceAccount, cert, getApp, getApps } from "firebase-admin/app";

const { FIREBASE_SERVICE_ACCOUNT_KEY = "" } = process.env;
const key: ServiceAccount = JSON.parse(
  FIREBASE_SERVICE_ACCOUNT_KEY
) as ServiceAccount;

if (!getApps().length) {
  admin.initializeApp({ credential: cert(key) });
}
getApp();
const db = admin.firestore();

export default db;
