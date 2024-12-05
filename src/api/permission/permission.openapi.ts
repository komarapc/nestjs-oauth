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

export class PermissionQueryDto {
  @ApiProperty({ type: 'string', description: 'role name', required: false })
  roleName?: string;
  @ApiProperty({
    type: 'string',
    description: 'resource name',
    required: false,
  })
  resourceName?: string;
  @ApiProperty({ type: 'string', description: 'action', required: false })
  action?: string;
  @ApiProperty({
    type: 'string',
    description: 'page',
    default: '1',
  })
  page?: string;
  @ApiProperty({
    type: 'string',
    description: 'limit',
    default: '10',
  })
  limit?: string;
}
