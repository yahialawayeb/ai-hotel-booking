import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, RoomsModule, ReservationsModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
