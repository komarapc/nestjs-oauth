import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const resourceQuerySchema = z.object({
  name: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((value) => parseInt(value))
    .default('1'),
  limit: z
    .string()
    .optional()
    .transform((value) => parseInt(value))
    .default('10'),
});
export const resourceCreateSchema = z.object({
  name: z.string().min(3),
  path: z.string().min(1),
});

export type ResourceQuery = z.infer<typeof resourceQuerySchema>;
export type ResourceCreateSchema = z.infer<typeof resourceCreateSchema>;
