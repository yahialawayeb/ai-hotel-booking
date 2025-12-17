import { CreateUserDto } from '../../users/dto/create-user.dto';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto extends CreateUserDto { }

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @ApiProperty({ example: 'password123' })
    password: string;
}
