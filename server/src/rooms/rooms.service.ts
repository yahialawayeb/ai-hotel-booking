import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService) { }

    create(createRoomDto: CreateRoomDto) {
        return this.prisma.room.create({
            data: createRoomDto,
        });
    }

    findAll() {
        return this.prisma.room.findMany();
    }

    findOne(id: number) {
        return this.prisma.room.findUnique({
            where: { id },
        });
    }

    update(id: number, updateRoomDto: UpdateRoomDto) {
        return this.prisma.room.update({
            where: { id },
            data: updateRoomDto,
        });
    }

    remove(id: number) {
        return this.prisma.room.delete({
            where: { id },
        });
    }
}
