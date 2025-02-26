import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateItineraryParams } from 'src/common/definitions/interface/itinerary/createItinerary';
import { exception } from 'src/common/exeptions';
import { makeIHumanizedItinerary } from 'src/common/utils/itinerary/humanized_itinerary';
import { manipulateTickets } from 'src/common/utils/itinerary/manipulate_ticket';
import { sortItinerary } from 'src/common/utils/itinerary/sort_itinerary';
import { Itinerary } from 'src/database/Itinerary/Itinerary.entity';
import { TicketParser } from 'src/database/TicketParser/TicketParser.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ItineraryService {
  constructor(
    @InjectRepository(Itinerary)
    private ItineraryRepository: Repository<Itinerary>,
    @InjectRepository(TicketParser)
    private TicketParserRepository: Repository<TicketParser>,
  ) {}

  async create(createItinerary: CreateItineraryParams) {
    const incomingTicketsTypeList = createItinerary.TicketList.map(
      (t) => t.transportType,
    );

    const ticketParsers = await this.TicketParserRepository.find({
      where: {
        Type: In(incomingTicketsTypeList),
      },
    });
    if (!ticketParsers.length)
      exception.itinerary.parserNotFound(createItinerary);

    const { wasSuccess, parsedTicket, unparsed } = manipulateTickets(
      ticketParsers,
      createItinerary.TicketList,
    );

    if (wasSuccess) {
      const itinerary = sortItinerary(parsedTicket);
      const Humanized = makeIHumanizedItinerary(itinerary);
      const sortedRawTicket = itinerary.map((t) => JSON.stringify(t.raw));
      const newItinerary = {
        Humanized,
        SortedTicket: sortedRawTicket,
      };
      const rowToSave = this.ItineraryRepository.create(newItinerary);
      const result = await this.ItineraryRepository.save(rowToSave);
      return result;
    } else {
      exception.itinerary.wrongTicket(unparsed.map((t) => t.transportType));
    }
  }
  async findOne(Id: number) {
    const itinerary = await this.ItineraryRepository.findOneBy({ Id });
    if (!itinerary) exception.itinerary.notFound();
    return itinerary;
  }
}
