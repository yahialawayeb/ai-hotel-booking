import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
    @ApiProperty({ example: '101' })
    number: string;

    @ApiProperty({ example: 'Deluxe' })
    type: string;

    @ApiProperty({ example: 150.00 })
    price: number;

    @ApiProperty({ example: 'A lovely room with a view', required: false })
    description?: string;

    @ApiProperty({ example: 'https://images.unsplash.com/photo...', required: false })
    image?: string;

    @ApiProperty({ example: true, required: false })
    isAvailable?: boolean;
}
