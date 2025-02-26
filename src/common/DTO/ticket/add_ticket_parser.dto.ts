import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { mock } from 'src/configs/swagger/mock';

export class AddTicketParserDTO {
  @IsString({ message: 'type must be string' })
  @IsNotEmpty({ message: 'type is required' })
  @ApiProperty({ default: mock.parser.add.Type })
  readonly Type: string;

  @IsString({ message: 'OriginKey must be string' })
  @IsNotEmpty({ message: 'OriginKey is required' })
  @ApiProperty({ default: mock.parser.add.OriginKey })
  readonly OriginKey: string;

  @IsString({ message: 'DestinationKey must be string' })
  @IsNotEmpty({ message: 'DestinationKey is required' })
  @ApiProperty({ default: mock.parser.add.DestinationKey })
  readonly DestinationKey: string;

  @IsString({ message: 'Helper must be string' })
  @IsNotEmpty({ message: 'Helper is required' })
  @ApiProperty({ default: mock.parser.add.Helper })
  readonly Helper: string;

  @IsNotEmpty({ message: 'TicketExample is required' })
  @ApiProperty({
    default: mock.parser.add.TicketExample,
    type: 'object',
    additionalProperties: {},
  })
  readonly TicketExample: object;
}
