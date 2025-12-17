import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
    @ApiProperty({ example: '2023-12-25T14:00:00Z' })
    startDate: string; // ISO Date string

    @ApiProperty({ example: '2023-12-30T10:00:00Z' })
    endDate: string;   // ISO Date string

    @ApiProperty({ example: 1 })
    roomId: number;
}
