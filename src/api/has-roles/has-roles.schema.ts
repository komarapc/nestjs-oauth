import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const hasRolesCreateSchema = z.object({
  user_id: z.string().min(36).max(36),
  role_id: z.string().min(36).max(36),
});
export class HasRolesCreateDto {
  @ApiProperty({ description: 'The ID of the user' })
  user_id: string;

  @ApiProperty({ description: 'The ID of the role' })
  role_id: string;
}
export type HasRolesCreateSchema = z.infer<typeof hasRolesCreateSchema>;
