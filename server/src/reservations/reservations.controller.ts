import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a reservation' })
    @Post()
    create(@Body() createReservationDto: CreateReservationDto, @Request() req) {
        return this.reservationsService.create(createReservationDto, req.user.userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all reservations' })
    @Get()
    findAll() {
        return this.reservationsService.findAll();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get a reservation by ID' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reservationsService.findOne(+id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a reservation' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
        return this.reservationsService.update(+id, updateReservationDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a reservation' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reservationsService.remove(+id);
    }
}
