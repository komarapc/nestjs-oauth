import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const rolesQuerySchema = z.object({
  name: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((v) => parseInt(v))
    .default('1'),
  limit: z
    .string()
    .optional()
    .transform((v) => parseInt(v))
    .default('10'),
});
export type RolesQuerySchema = z.infer<typeof rolesQuerySchema>;

export const rolesCreateSchema = z.object({
  name: z.string().min(3),
});
export type RolesCreateSchema = z.infer<typeof rolesCreateSchema>;

export class RolesCreateDto {
  @ApiProperty({ name: 'name', type: 'string', minLength: 3 })
  name: string;
}
