import { HttpException, HttpStatus } from '@nestjs/common';
import { Itinerary } from 'src/database/Itinerary/Itinerary.entity';

function badRequestException(message: string, data: any) {
  throw new HttpException(
    {
      message,
      data,
    },
    HttpStatus.BAD_REQUEST,
  );
}
function notFoundException(message: string) {
  throw new HttpException(message, HttpStatus.NOT_FOUND);
}
const EM = {
  itinerary: {
    wrongTicket:
      'some ticket are not valid you may consider double check your tickets list in data',
    parserNotFound:
      'not any of parser matches your request please either check your ticket or consider add a new parser with /ticket/parser',
    notFound: 'itinerary not found!',
  },
  ticketParser: {
    createError:
      'cant created parser. reason: parser cant parse his example ticket',
    notFound: 'parser not found',
  },
};
export const exception = {
  itinerary: {
    wrongTicket: (data: any) =>
      badRequestException(EM.itinerary.wrongTicket, data),
    parserNotFound: (data: any) =>
      badRequestException(EM.itinerary.parserNotFound, data),
    notFound: () => notFoundException(EM.itinerary.notFound),
  },
  ticketParser: {
    parserNotValid: (data: any) =>
      badRequestException(EM.ticketParser.createError, data),
    notFound: () => notFoundException(EM.ticketParser.notFound),
  },
};
