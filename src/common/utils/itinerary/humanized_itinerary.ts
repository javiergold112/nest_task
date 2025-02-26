import { ParsedTicket } from 'src/common/definitions/types/itinerary';

export function makeIHumanizedItinerary(sortedTicket: ParsedTicket[]) {
  const textGenerator = (num: number, text: string) => `${num}. ${text}`;
  const start = 'Start';
  const end = 'Last destination reached.';
  const Illustrated: string[] = [];
  Illustrated.push(textGenerator(0, start));
  for (let index = 0; index < sortedTicket.length; index++) {
    const ticket = sortedTicket[index];
    Illustrated.push(textGenerator(index + 1, ticket.helper));
  }
  Illustrated.push(textGenerator(sortedTicket.length + 1, end));
  return Illustrated;
}
