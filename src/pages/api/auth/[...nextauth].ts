import jwt from "jwt-simple";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const {
  ENV,
  GOOGLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
  NEXTAUTH_SECRET = "",
} = process.env;

const session = async (params: { session: Session; token: JWT }) => {
  const encodedToken = jwt.encode(params.token, NEXTAUTH_SECRET);
  params.session.token = encodedToken;
  return params.session;
};

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: ENV !== "prod",
  callbacks: {
    session,
  },
};

const auth = (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, options);

export default auth;
