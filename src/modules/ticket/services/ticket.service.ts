import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketParser } from 'src/database/TicketParser/TicketParser.entity';
import { Repository } from 'typeorm';
import { updateParserParams } from 'src/common/definitions/interface/ticket/updateParser';
import { addParserParams } from 'src/common/definitions/interface/ticket/addParser';
import { checkTicketParserValidation } from 'src/common/utils/ticket';
import { exception } from 'src/common/exeptions';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketParser)
    private TicketParsersRepository: Repository<TicketParser>,
  ) {}

  checkParser(parser: addParserParams) {
    const parserCheckResult = checkTicketParserValidation(parser);
    const { errorList, ...rest } = parserCheckResult;
    if (parserCheckResult.isValid) {
      return { message: 'parser successfully parsed ticket', ...rest };
    } else {
      return { message: 'parser cant parse this ticket', ...parserCheckResult };
    }
  }
  async create(parser: addParserParams) {
    const result = this.checkParser(parser);
    if (!result.isValid) exception.ticketParser.parserNotValid(result);

    const newParser = this.TicketParsersRepository.create(parser);
    await this.TicketParsersRepository.save(newParser);
    const messages = ['parser added successfully.', ...result.parsedData];
    return messages;
  }

  async findAll() {
    return this.TicketParsersRepository.find();
  }

  async findOne(Id: number) {
    const ticket = await this.TicketParsersRepository.findOneBy({ Id });
    if (ticket) {
      return ticket;
    }
    exception.ticketParser.notFound();
  }

  async update(Id: number, updateParser: updateParserParams) {
    await this.TicketParsersRepository.update(Id, updateParser);
    return this.TicketParsersRepository.findOneBy({ Id });
  }

  async remove(id: number): Promise<void> {
    await this.TicketParsersRepository.delete(id);
  }
}
