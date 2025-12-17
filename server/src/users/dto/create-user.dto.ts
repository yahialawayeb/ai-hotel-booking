import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @ApiProperty({ example: 'password123' })
    password: string;

    @ApiProperty({ example: 'John Doe', required: false })
    name?: string;

    @ApiProperty({ example: 'USER', enum: ['USER', 'ADMIN'], required: false })
    role?: 'USER' | 'ADMIN';
}
