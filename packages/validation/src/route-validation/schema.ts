import { z } from "zod";
import { common } from "./routes/common";

const { _id, createdAt, updatedAt } = common;

export const userSchema = z.object({
  _id,
  createdAt,
  updatedAt,
  googleId: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url().optional(),
});

export const tagSchema = z.object({
  ...common,
  name: z.string(),
});

export const thoughtBoxSchema = z.object({
  ...common,
  name: z.string(),
  color: z.string(),
  numberOfThoughts: z.number().min(0).optional(),
  thoughts: z.array(z.string().uuid()).optional(),
});

export const thoughtSchema = z.object({
  ...common,
  title: z.string(),
  content: z.string(),
  thoughtBox: z.string().uuid(),
  tags: z.array(z.string().uuid()),
});

export const thoughtSchemaPopulated = z.object({
  ...common,
  title: z.string(),
  content: z.string(),
  thoughtBox: thoughtBoxSchema,
  tags: z.array(tagSchema),
});

export const thoughtBoxSchemaPopulated = z.object({
  ...common,
  name: z.string(),
  color: z.string(),
  numberOfThoughts: z.number().min(0).optional(),
  thoughts: z.array(thoughtSchema).optional(),
});
