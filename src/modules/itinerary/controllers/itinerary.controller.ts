import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ItineraryService } from '../services/itinerary.service';
import { CreateItineraryDTO } from 'src/common/DTO/itinerary/create_itinerary.dto';
import { ApiDocDecorator } from 'src/configs/swagger/decorator';

@Controller('itinerary')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post('make')
  @ApiDocDecorator('itineraryAdd')
  add(@Body() createItinerary: CreateItineraryDTO): any {
    return this.itineraryService.create(createItinerary);
  }

  @Get(':id')
  @ApiDocDecorator('itineraryGet')
  findOne(@Param('id') id: number) {
    return this.itineraryService.findOne(id);
  }
}
