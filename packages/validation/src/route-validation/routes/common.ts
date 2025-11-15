import { z } from 'zod';

export const common = {
  _id: z.string().uuid(),
  createdBy: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
}