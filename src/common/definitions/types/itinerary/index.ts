export type ParsedTicket = {
  from: string;
  to: string;
  helper: string;
  raw: Record<string, any>;
};
export type RawTicket = {
  transportType?: string;
  ticket: Record<string, any>;
};
