import { z } from 'zod';
export const permissionCreateSchema = z.array(
  z.object({
    role_id: z.string().uuid(),
    resource_id: z.string().uuid(),
    action: z.array(z.enum(['create', 'read', 'update', 'delete'])).min(1),
  }),
);
export const permissionQuerySchema = z.object({
  roleName: z.string().optional(),
  resourceName: z.string().optional(),
  action: z.string().optional(),
  page: z
    .string()
    .transform((v) => parseInt(v))
    .default('1'),
  limit: z
    .string()
    .transform((v) => parseInt(v))
    .default('10'),
});

export const permissionUpdateSchema = z.object({
  resource_id: z.string().uuid(),
  action: z.array(z.enum(['create', 'read', 'update', 'delete'])).min(1),
});

export type PermissionCreateSchema = z.infer<typeof permissionCreateSchema>;
export type PermissionQuerySchema = z.infer<typeof permissionQuerySchema>;
export type PermissionUpdateSchema = z.infer<typeof permissionUpdateSchema>;
