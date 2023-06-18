import { Game, Override, WithId } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { options as authOptions } from "./auth/[...nextauth]";

const VARS = ["ENV", "GRAPHQL_URL"];

export type RequestEnvParameters = {
  vars: string[];
};

type Request = Override<NextApiRequest, { body: RequestEnvParameters }>;

const handler = async (
  request: Request,
  response: NextApiResponse<Record<string, string | undefined>>
) => {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(403).json({ message: "Access Denied" });
    return;
  }

  const envVars = VARS.reduce<Record<string, string | undefined>>(
    (memo, varName) => {
      memo[varName] = process.env[varName];
      return memo;
    },
    {}
  );

  console.log(envVars);

  try {
    response.status(200).json(envVars);
  } catch (error) {
    response.status(500);
  }
};

export default handler;
