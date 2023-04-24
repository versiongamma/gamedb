import admin from "firebase-admin";
import { ServiceAccount, cert, getApp, getApps } from "firebase-admin/app";

import key from "./key.json";

if (!getApps().length) {
  admin.initializeApp({ credential: cert(key as ServiceAccount) });
}
getApp();
const db = admin.firestore();

export default db;
