import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { AddTicketParserDTO } from 'src/common/DTO/ticket/add_ticket_parser.dto';
import { UpdateTicketParserDTO } from 'src/common/DTO/ticket/update_ticket_parser.dto';
import { ApiDocDecorator } from 'src/configs/swagger/decorator';

@Controller('ticket/parser')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiDocDecorator('ticketAdd')
  @Post()
  addTicketParser(@Body() AddTicketParser: AddTicketParserDTO): any {
    return this.ticketService.create(AddTicketParser);
  }

  @ApiDocDecorator('ticketCheck')
  @Post('check')
  checkTicketParser(@Body() AddTicketParser: AddTicketParserDTO): any {
    return this.ticketService.checkParser(AddTicketParser);
  }

  @Get()
  @ApiDocDecorator('ticketGetAll')
  getAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  @ApiDocDecorator('ticketGetOne')
  findOne(@Param('id') id: number) {
    return this.ticketService.findOne(id);
  }

  @Put(':id')
  @ApiDocDecorator('ticketUpdate')
  update(
    @Param('id') id: number,
    @Body() updateTicketParser: UpdateTicketParserDTO,
  ) {
    return this.ticketService.update(id, updateTicketParser);
  }

  @Delete(':id')
  @ApiDocDecorator('ticketDelete')
  remove(@Param('id') id: number) {
    return this.ticketService.remove(id);
  }
}
