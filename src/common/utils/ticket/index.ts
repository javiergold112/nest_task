import Fuse from 'fuse.js';
import { addParserParams } from 'src/common/definitions/interface/ticket/addParser';
import { getNestedValue } from '..';
import { RawTicket } from 'src/common/definitions/types/itinerary';
import { ticketParser } from 'src/common/definitions/types/ticket/ticket';

function replaceKeys(str: string, obj: Record<string, any>): string {
  return str.replace(/<([^>]+)>/g, (_, key) => {
    const result = getNestedValue(obj, key);
    return result.wasValid ? result.data : `<${key}>`;
  });
}
function findRemainKey(str: string): string[] {
  const remain = str.match(/<([^>]+)>/g);
  return remain ? remain : [];
}
export function parseTicket(
  ticketParser: ticketParser,
  ticket: Record<string, any>,
) {
  const { DestinationKey, OriginKey, Helper } = ticketParser;
  const destinationResult = getNestedValue(ticket, DestinationKey);
  const originResult = getNestedValue(ticket, OriginKey);
  const parsedHelper = replaceKeys(Helper, ticket);
  const remainUnParsed = findRemainKey(parsedHelper);

  const wasSuccess =
    destinationResult.wasValid &&
    originResult.wasValid &&
    remainUnParsed.length == 0;
  return {
    wasSuccess,
    data: {
      from: originResult.data,
      to: destinationResult.data,
      helper: parsedHelper,
      raw: ticket,
    },
    validDestination: destinationResult.wasValid,
    validOrigin: originResult.wasValid,
    validHelper: Boolean(remainUnParsed),
    unParsedHelper: [remainUnParsed],
  };
}

export function checkTicketParserValidation(ticketParser: addParserParams) {
  const errorList: string[] = [];
  const parsedData: string[] = [];
  const ticket = ticketParser.TicketExample;

  if (typeof ticket === 'object') {
    const { data, validDestination, validOrigin, validHelper, unParsedHelper } =
      parseTicket(ticketParser, ticket);

    if (validDestination) parsedData.push(`Destination= ${data.to}`);
    else errorList.push('DestinationKey can not be found in ticket example');

    if (validOrigin) parsedData.push(`Origin= ${data.from}`);
    else errorList.push('OriginKey can not be found in ticket example');

    if (!validHelper) {
      errorList.push(
        ...unParsedHelper.map(
          (item) =>
            `helper part can not be parse with in ticket example: ${item} not exist in ticket example`,
        ),
      );
    } else parsedData.push(`helper= ${data.helper}`);
  } else {
    errorList.push('ticket example is not valid parsable object ');
  }
  const isValid = errorList.length === 0;
  return {
    isValid,
    errorList,
    parsedData,
  };
}
