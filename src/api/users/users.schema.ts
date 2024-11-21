import { z } from 'zod';

export const userQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => parseInt(val))
    .default('1'),
  limit: z
    .string()
    .optional()
    .transform((val) => parseInt(val))
    .default('10'),
});
export type UserQuerySchema = z.infer<typeof userQuerySchema>;

export const userCreateSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export type UserCreateSchema = z.infer<typeof userCreateSchema>;

export const userUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
