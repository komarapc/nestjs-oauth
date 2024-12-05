import { z } from 'zod';
export const permissionCreateSchema = z.array(
  z.object({
    role_id: z.string().uuid(),
    resource_id: z.string().uuid(),
    action: z.array(z.enum(['create', 'read', 'update', 'delete'])).min(1),
  }),
);

export type PermissionCreateSchema = z.infer<typeof permissionCreateSchema>;
