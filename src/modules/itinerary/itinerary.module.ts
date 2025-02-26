import { Module } from '@nestjs/common';
import { ItineraryService } from './services/itinerary.service';
import { ItineraryController } from './controllers/itinerary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from 'src/database/Itinerary/Itinerary.entity';
import { TicketParser } from 'src/database/TicketParser/TicketParser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Itinerary, TicketParser])],
  providers: [ItineraryService],
  controllers: [ItineraryController],
})
export class ItineraryModule {}
