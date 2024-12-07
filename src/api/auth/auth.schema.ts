import { z } from 'zod';

export const authLocalLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authLocalLoginRolesSchema = z.object({
  role_id: z.string().uuid(),
});
export type AuthLocalLoginSchema = z.infer<typeof authLocalLoginSchema>;
export type AuthLocalLoginRolesSchema = z.infer<
  typeof authLocalLoginRolesSchema
>;
export type AuthTokenPayload = { user_id: string; role_id: string };
