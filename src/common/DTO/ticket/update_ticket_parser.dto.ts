import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AddTicketParserDTO } from './add_ticket_parser.dto';
import { mock } from 'src/configs/swagger/mock';

export class UpdateTicketParserDTO {
  @IsString({ message: 'type must be string' })
  @IsNotEmpty({ message: 'type is required' })
  @ApiProperty({ default: mock.parser.update.Type })
  readonly Type: string;

  @IsString({ message: 'OriginKey must be string' })
  @IsNotEmpty({ message: 'OriginKey is required' })
  @ApiProperty({ default: mock.parser.update.OriginKey })
  readonly OriginKey: string;

  @IsString({ message: 'DestinationKey must be string' })
  @IsNotEmpty({ message: 'DestinationKey is required' })
  @ApiProperty({ default: mock.parser.update.DestinationKey })
  readonly DestinationKey: string;

  @IsString({ message: 'Helper must be string' })
  @IsNotEmpty({ message: 'Helper is required' })
  @ApiProperty({ default: mock.parser.update.Helper })
  readonly Helper: string;
}
