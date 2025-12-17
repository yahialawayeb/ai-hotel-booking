import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
    constructor(private prisma: PrismaService) { }

    create(createReservationDto: CreateReservationDto, userId: number) {
        return this.prisma.reservation.create({
            data: {
                startDate: new Date(createReservationDto.startDate),
                endDate: new Date(createReservationDto.endDate),
                room: { connect: { id: +createReservationDto.roomId } },
                user: { connect: { id: userId } },
            },
        });
    }

    findAll() {
        return this.prisma.reservation.findMany({
            include: { user: true, room: true },
        });
    }

    findOne(id: number) {
        return this.prisma.reservation.findUnique({
            where: { id },
            include: { user: true, room: true },
        });
    }

    update(id: number, updateReservationDto: UpdateReservationDto) {
        const { startDate, endDate, roomId, ...rest } = updateReservationDto;
        const data: any = { ...rest };
        if (startDate) data.startDate = new Date(startDate);
        if (endDate) data.endDate = new Date(endDate);
        if (roomId) data.room = { connect: { id: +roomId } };

        return this.prisma.reservation.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.reservation.delete({
            where: { id },
        });
    }
}
