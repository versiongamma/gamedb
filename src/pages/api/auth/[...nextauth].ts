import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const { ENV, GOOGLE_CLIENT_ID = "", GOOGLE_CLIENT_SECRET = "" } = process.env;

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  debug: ENV !== "prod",
};

const auth = (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, options);

export default auth;
