import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
  @ApiProperty({ type: 'string', description: 'id of role' })
  role_id?: string;
  @ApiProperty({ type: 'string', description: 'id of resource' })
  resource_id?: string;
  @ApiProperty({
    type: 'array',
    description: 'action of permission',
    example: ['create', 'read', 'update', 'delete'],
  })
  action?: Array<'create' | 'read' | 'update' | 'delete'>;
}

export class PermissionCreateDto {
  @ApiProperty({ type: [PermissionDto] })
  data: PermissionDto[];
}
