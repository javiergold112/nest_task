const airplaneTicket = {
  flight_number: 'AB1234',
  airline: 'Skyline Airways',
  departure_details: {
    departure_airport: 'Los Angeles International Airport',
    arrival_airport: 'John F. Kennedy International Airport',
    departure_time: '2025-03-15T08:00:00',
    gate: 'A12',
  },
  arrival_details: {
    arrival_airport: 'John F. Kennedy International Airport',
    departure_airport: 'Los Angeles International Airport',
    arrival_time: '2025-03-15T16:00:00',
  },
  class: 'Economy',
  seat: '12A',
  passenger_name: 'Jane Doe',
  ticket_number: '1234567890',
  booking_reference: 'SKY987654',
  baggage_allowance: '2 x 23kg',
  price: '350.00',
  contact: {
    email: 'jane.doe@example.com',
    phone: '+1-555-1234',
  },
};
const trainTicket = {
  train_company: 'FastTrack Rail',
  train_trip: {
    departure_station: 'Union Station, Chicago',
    destination_station: 'Central Station, New York',
    departure_time: '2025-03-20T06:45:00',
    arrival_time: '2025-03-20T18:30:00',
    platform_number: '6',
  },
  carriage_number: 'C5',
  seat_number: 'D12',
  passenger_name: 'Robert King',
  ticket_number: 'TR987654',
  booking_reference: 'FT123ABC',
  price: '95.00',
  contact: {
    email: 'robert.king@example.com',
    phone: '+1-555-9870',
  },
  class: 'First',
  train_type: 'High-Speed',
};
const boatTicket = {
  boat_company: 'SeaCruise Ltd.',
  trip_details: {
    departure_port: 'Port of Miami',
    destination_port: 'Port of Nassau',
    departure_time: '2025-03-18T18:00:00',
    arrival_time: '2025-03-19T08:00:00',
  },
  cabin_class: 'Luxury',
  seat_number: 'C204',
  passenger_name: 'Emily Green',
  ticket_number: '5678901234',
  booking_reference: 'SEA54321',
  price: '120.00',
  contact: {
    email: 'emily.green@example.com',
    phone: '+1-555-2345',
  },
  vessel_type: 'Cruise Ship',
};
const bustTicket = {
  bus_company: 'CityBus',
  route_details: {
    departure_station: 'Main Street Bus Station',
    destination_station: 'Downtown Bus Terminal',
    departure_time: '2025-03-16T10:30:00',
    arrival_time: '2025-03-16T12:15:00',
  },
  seat_number: 'A15',
  passenger_name: 'John Smith',
  ticket_number: '987654321',
  booking_reference: 'BUS12345',
  price: '15.50',
  contact: {
    email: 'john.smith@example.com',
    phone: '+1-555-9876',
  },
  bus_type: 'Express',
};
const TaxiTicket = {
  taxi_company: 'QuickRide',
  trip_details: {
    pickup_location: '123 Maple St, City Center',
    dropoff_location: '456 Oak Ave, Uptown',
    pickup_time: '2025-03-17T14:30:00',
    ride_duration: '25 minutes',
    distance_travelled: '8.5 km',
  },
  driver_name: 'Michael Johnson',
  vehicle_number: 'TX12345',
  passenger_name: 'Alice Blue',
  ticket_number: 'TX54321',
  price: '25.75',
  payment_method: 'Credit Card',
  surge_pricing: 'Yes',
  contact: {
    email: 'alice.blue@example.com',
    phone: '+1-555-7654',
  },
};
const ticketExample = {
  airplaneTicket,
  trainTicket,
  boatTicket,
  bustTicket,
  TaxiTicket,
};
const trainTicketParser = {
  Type: 'Train',
  OriginKey: 'train_trip.departure_station',
  DestinationKey: 'train_trip.destination_station',
  Helper:
    'Board train <train_number> from <train_trip.departure_station> to <train_trip.destination_station>, departing at <train_trip.departure_time>. Seat <seat_number>, carriage <carriage_number>, arriving at <train_trip.arrival_time>.',
  TicketExample: trainTicket,
};

const taxiTicketParser = {
  Type: 'Taxi',
  OriginKey: 'trip_details.pickup_location',
  DestinationKey: 'trip_details.dropoff_location',
  Helper:
    'From <trip_details.pickup_location>, take the taxi to <trip_details.dropoff_location>. The driver is <driver_name>, vehicle <vehicle_number>, ride duration: <trip_details.ride_duration>.',
  TicketExample: TaxiTicket,
};
const boatTicketParser = {
  Type: 'Boat',
  OriginKey: 'trip_details.departure_port',
  DestinationKey: 'trip_details.destination_port',
  Helper:
    'From <trip_details.departure_port>, board the boat to <trip_details.destination_port>, departing at <trip_details.departure_time> and arriving at <trip_details.arrival_time>. Cabin class: <cabin_class>, seat <seat_number>.',
  TicketExample: boatTicket,
};
const busTicketParser = {
  Type: 'Bus',
  OriginKey: 'route_details.departure_station',
  DestinationKey: 'route_details.destination_station',
  Helper:
    'Board bus <route> at <route_details.departure_station> to <route_details.destination_station>. Arriving at <route_details.arrival_time>, seat <seat_number>.',
  TicketExample: bustTicket,
};
const airplaneTicketParser = {
  Type: 'Airplane',
  OriginKey: 'departure_details.departure_airport',
  DestinationKey: 'departure_details.arrival_airport',
  Helper:
    'From <departure_details.departure_airport>, board flight <flight_number> to <departure_details.arrival_airport> from gate <departure_details.gate>, seat <seat>. Luggage allowance: <baggage_allowance>.',
  TicketExample: airplaneTicket,
};
const randomTicketList = [
  {
    transportType: 'Train',
    ticket: {
      train_company: 'Eurostar',
      train_trip: {
        departure_station: 'London St Pancras',
        destination_station: 'Paris Gare du Nord',
        departure_time: '2025-03-13T14:30:00',
        arrival_time: '2025-03-13T16:30:00',
      },
      seat_number: '12B',
      ticket_number: 'EURO67890',
    },
  },
  {
    transportType: 'Bus',
    ticket: {
      bus_company: 'Greyhound',
      route_details: {
        departure_station: 'Port Authority Bus Terminal, NYC',
        destination_station: 'Boston South Station',
        departure_time: '2025-03-10T19:00:00',
        arrival_time: '2025-03-10T23:00:00',
      },
      seat_number: 'B7',
      ticket_number: 'BUS7774',
    },
  },
  {
    transportType: 'Boat',
    ticket: {
      trip_details: {
        departure_port: 'Montreal Port',
        destination_port: 'Toronto Harbor',
        departure_time: '2025-03-12T09:00:00',
        arrival_time: '2025-03-12T17:30:00',
      },
      cabin_class: 'Standard',
      seat_number: 'C10',
      ticket_number: 'BOAT89745',
    },
  },
  {
    transportType: 'Taxi',
    ticket: {
      trip_details: {
        pickup_location: 'Toronto Harbor',
        dropoff_location: 'Toronto Pearson International Airport',
        pickup_time: '2025-03-12T18:00:00',
        ride_duration: '45 minutes',
      },
      driver_name: 'Lisa Chen',
      vehicle_number: 'TX9021',
      ticket_number: 'TX305784',
    },
  },
  {
    transportType: 'Airplane',
    ticket: {
      flight_number: 'AA230',
      airline: 'Skyline Airways',
      departure_details: {
        departure_airport: 'Los Angeles International Airport',
        arrival_airport: 'John F. Kennedy International Airport',
        departure_time: '2025-03-10T08:30:00',
        gate: 'B12',
      },
      arrival_details: {
        arrival_airport: 'John F. Kennedy International Airport',
        departure_airport: 'Los Angeles International Airport',
        arrival_time: '2025-03-10T16:00:00',
      },
      class: 'Economy',
      seat: '21A',
      passenger_name: 'Jane Doe',
      ticket_number: 'AB12345',
      baggage_allowance: '1 x 23kg',
    },
  },
  {
    transportType: 'Taxi',
    ticket: {
      trip_details: {
        pickup_location: 'John F. Kennedy International Airport',
        dropoff_location: 'Port Authority Bus Terminal, NYC',
        pickup_time: '2025-03-10T17:30:00',
        ride_duration: '40 minutes',
      },
      driver_name: 'Michael Johnson',
      vehicle_number: 'TX7845',
      ticket_number: 'TX202534',
    },
  },
  {
    transportType: 'Airplane',
    ticket: {
      flight_number: 'AF678',
      airline: 'Air Canada',
      departure_details: {
        departure_airport: 'Toronto Pearson International Airport',
        arrival_airport: 'London Heathrow Airport',
        departure_time: '2025-03-12T22:00:00',
        gate: 'C7',
      },
      seat: '18F',
      ticket_number: 'AC99876',
      baggage_allowance: '2 x 23kg',
    },
  },
  {
    transportType: 'Train',
    ticket: {
      train_company: 'Amtrak',
      train_trip: {
        departure_station: 'Boston South Station',
        destination_station: 'Montreal Central Station',
        departure_time: '2025-03-11T08:00:00',
        arrival_time: '2025-03-11T18:00:00',
      },
      carriage_number: 'C4',
      seat_number: 'D15',
      ticket_number: 'TR55621',
    },
  },
  {
    transportType: 'Bus',
    ticket: {
      bus_company: 'Greyhound',
      route_details: {
        departure_station: 'Port Authority Bus Terminal, NYC',
        destination_station: 'Boston South Station',
        departure_time: '2025-03-10T19:00:00',
        arrival_time: '2025-03-10T23:00:00',
      },
      seat_number: 'B7',
      ticket_number: 'BUS7774',
    },
  },
];
const createItinerary = [
  airplaneTicket,
  TaxiTicket,
  boatTicket,
  trainTicket,
  bustTicket,
];
export const mock = {
  parser: {
    add: airplaneTicketParser,
    update: airplaneTicketParser,
  },
  itinerary: {
    create: { TicketList: randomTicketList },
  },
};
