import {
  ParsedTicket,
  RawTicket,
} from 'src/common/definitions/types/itinerary';
import { TicketParser } from 'src/database/TicketParser/TicketParser.entity';
import { parseTicket } from '../ticket';

export function manipulateTickets(
  ticketParserList: TicketParser[],
  ticketList: RawTicket[],
) {
  const parsedTicket: ParsedTicket[] = [];
  const unparsed: RawTicket[] = [];
  for (const ticket of ticketList) {
    const properParser = ticketParserList.find(
      (tp) => tp.Type === ticket.transportType,
    );
    if (properParser) {
      const { wasSuccess, data } = parseTicket(properParser, ticket.ticket);
      if (wasSuccess) {
        parsedTicket.push(data);
      } else unparsed.push(ticket);
    }
  }
  return {
    wasSuccess: unparsed.length == 0,
    parsedTicket,
    unparsed,
  };
}
