import { db } from "@/db";
import { asyncHandler, errors } from "@/utils";
import env from "@/env";
import jwt from "jsonwebtoken";

export const auth = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new errors.Unauthorized();
  }
  const token = authorization.split(" ")[1];

  if (!token) {
    throw new errors.Unauthorized();
  }

  const payload = jwt.verify(token, env.jwt_secret) as { id: string };

  if (!payload) {
    throw new errors.Unauthorized();
  }

  const user = await db.query.users.findFirst({
    where: ({ id }, { eq }) => eq(id, payload.id),
  });
  if (!user) {
    throw new errors.Unauthorized();
  }
  req.user = user;
  next();
});