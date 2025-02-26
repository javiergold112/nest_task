import { Module } from '@nestjs/common';
import { TicketController } from './controllers/ticket.controller';
import { TicketService } from './services/ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketParser } from 'src/database/TicketParser/TicketParser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketParser])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
