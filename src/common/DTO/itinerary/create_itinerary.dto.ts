import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { mock } from 'src/configs/swagger/mock';

class TicketData {
  [key: string]: any; // Can be any type, allowing flexibility for the data
}

class Transport {
  @IsString({ message: 'transportType must be string' })
  @IsNotEmpty({ message: 'transportType can not be empty' })
  @ApiProperty()
  transportType: string;

  @IsObject({ message: 'ticket must be an object' })
  @ValidateNested({ message: 'ticket is not valid' })
  @ApiProperty()
  ticket: TicketData;

  constructor(transportType: string, ticket: TicketData) {
    this.transportType = transportType;
    this.ticket = ticket;
  }
}

export class CreateItineraryDTO {
  @IsArray({ message: 'TicketList must be an array of tickets' })
  @ArrayNotEmpty({ message: 'TicketList array can not be empty' })
  @ValidateNested({ each: true })
  @ApiProperty({ default: mock.itinerary.create.TicketList })
  @Type(() => Transport)
  TicketList: Transport[];

  constructor(TicketList: Transport[]) {
    this.TicketList = TicketList;
  }
}
