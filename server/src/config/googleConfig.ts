import { OAuth2Client } from "google-auth-library";
import env from "@/env";

const client = new OAuth2Client(env.google.web_client_id);

export const verifyGoogleToken = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: env.google.web_client_id 
  });

  const payload = ticket.getPayload();
  if (!payload) throw new Error("Invalid Google token");

  return {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
    sub: payload.sub, // Google user ID
  };
};