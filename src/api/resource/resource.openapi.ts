import { ApiProperty } from '@nestjs/swagger';

export class ResourceCreateDto {
  @ApiProperty({ name: 'name', type: 'string', required: true })
  name: string;
}

export class ResourceQueryDto {
  @ApiProperty({ name: 'name', type: 'string', required: false })
  name: string;
}
