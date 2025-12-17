import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new room' })
    @Post()
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }

    @ApiOperation({ summary: 'Get all rooms' })
    @Get()
    findAll() {
        return this.roomsService.findAll();
    }

    @ApiOperation({ summary: 'Get a room by ID' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roomsService.findOne(+id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a room' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
        return this.roomsService.update(+id, updateRoomDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a room' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roomsService.remove(+id);
    }
}
