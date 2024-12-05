import { ApiProperty } from '@nestjs/swagger';

export class ResourceCreateDto {
  @ApiProperty({ name: 'name', type: 'string', required: true })
  name: string;
  @ApiProperty({ name: 'path', type: 'string' })
  path: string;
}

export class ResourceQueryDto {
  @ApiProperty({ name: 'name', type: 'string', required: false })
  name: string;
}
