import { z } from "zod";
import { emailSchema, parseOrThrow } from "./schema-utils";

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: emailSchema,
  age: z.number().int().positive().optional()
});

export type CreateUser = z.infer<typeof createUserSchema>;

export function validateCreateUser(data: unknown): CreateUser {
  return parseOrThrow(createUserSchema, data);
}
