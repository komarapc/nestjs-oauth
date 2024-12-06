import { ApiProperty } from '@nestjs/swagger';

export class AuthLocalLoginDto {
  @ApiProperty({ name: 'email', description: 'Email of user', type: String })
  email: string;
  @ApiProperty({
    name: 'password',
    description: 'Password of user',
    type: String,
    minLength: 6,
  })
  password: string;
}

export class AuthLocalLoginRolesDto {
  @ApiProperty({
    name: 'role_id',
    description: 'Role id of user',
    type: String,
    format: 'uuid',
  })
  role_id: string;
  @ApiProperty({
    name: 'token',
    description: 'Received token from login',
    type: String,
  })
  token: string;
}
