import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Registration is handled by AuthController

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }
}
