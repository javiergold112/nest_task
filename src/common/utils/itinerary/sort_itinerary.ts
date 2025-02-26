import { ParsedTicket } from 'src/common/definitions/types/itinerary';

export function sortItineraryN(parsedTicketList: ParsedTicket[]) {
  const fromMap = new Map<string, ParsedTicket>();
  for (const ticket of parsedTicketList) {
    fromMap.set(ticket.from, ticket);
  }
  const toValues = new Set(parsedTicketList.map((ticket) => ticket.to));
  let start = '';
  for (const ticket of parsedTicketList) {
    if (!toValues.has(ticket.from)) {
      start = ticket.from;
      break;
    }
  }
  const result: ParsedTicket[] = [];
  let current = start;
  while (fromMap.has(current)) {
    const ticket = fromMap.get(current)!;
    result.push(ticket);
    current = ticket.to;
  }

  return result;
}
function getLargestTip(possibleTrips: ParsedTicket[][]) {
  let largest = -Infinity;
  let largestTipIndex = '0';
  for (const index in possibleTrips) {
    const length = possibleTrips[index].length;
    if (length > largest) {
      largest = length;
      largestTipIndex = index;
    }
  }
  return possibleTrips[largestTipIndex];
}
export function sortItinerary(
  parsedTicketList: ParsedTicket[],
): ParsedTicket[] {
  const fromMap = new Map<string, ParsedTicket>();
  for (const ticket of parsedTicketList) {
    fromMap.set(ticket.from, ticket);
  }
  const toValues = new Set(parsedTicketList.map((ticket) => ticket.to));
  let allPossibleStart: string[] = [parsedTicketList[0].from];
  for (const ticket of parsedTicketList) {
    if (!toValues.has(ticket.from)) {
      allPossibleStart.push(ticket.from);
    }
  }
  const result: ParsedTicket[][] = [];
  for (const start of allPossibleStart) {
    let path: ParsedTicket[] = [];
    let current = start;
    while (fromMap.has(current)) {
      const ticket = fromMap.get(current)!;
      path.push(ticket);
      current = ticket.to;
    }
    result.push(path);
  }

  return getLargestTip(result);
}
