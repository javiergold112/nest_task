## Project Overview

The goal of this project is to create an API that sorts a list of travel tickets and generates a human-readable itinerary. Given a collection of transportation tickets (e.g., for buses, trains, flights), the system organizes them in the correct order from start to end, enabling users to follow their journey seamlessly. i start this project on feb 25 and with less than a day time but it was a nice challenge.

## Key Features:

Sorting Tickets: The API sorts a given list of unsorted tickets to create a chronological travel itinerary.
Humanized Itinerary: After sorting the tickets, the API generates a step-by-step, human-readable version of the itinerary, detailing the transport methods and relevant travel information.
This project provides a tool to organize and visualize a sequence of travel events, ensuring that users can follow their journey in the correct order, from the first destination to the last, based on a list of travel tickets.

## Project Setup

### Prerequisites

- Node.js >= 14.x
- Nest.js >= 8.x
- TypeORM
- Mysql

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/link.git/
   /*im not yet published it on git i hope i dnt forget */
   ```

2. Install dependencies:

   ```bash
   npm install
   or
   yard install
   ```

3. change e.env to .env or set database Data right in src/modules/app/app.module
   - `.env`

### Running the Application

To start the server in development mode:

```bash
npm run start:dev
```

### API Endpoints

#### 1. **Create Itinerary**

- **POST /itinerary/make**
- **Description**: Accepts all the tickets as input, sorts them from start to end, and returns the sorted tickets along with an identifier to retrieve the full itinerary.
- **Request Body**:

```json
{
  "TicketList":[
      "transportType": "Train",
      "ticket": {
        //any known ticket with available parser would work
    }
  ]
}
```

- **Response**:

```json
{
{
    "statusCode": 200,
    "data": {
        "SortedTicket": [
            "{ticket data goes here}"
        ],
        "Humanized": [
            "Start",
            "1. Board train RJX 765, Platform 3 from St. Anton am Arlberg Bahnhof to Innsbruck Hbf. Seat number 17C.",
            "2. Board the Bus from Innsbruck Hbf to Innsbruck Airport.",
            "Last destination reached."
        ],
        "Id": "4",
        "createdAt": "2025-02-26T14:33:44.566Z"
    },
    "message": "operation successful"
}
}
```

#### 2. **Get Itinerary**

- **GET /itinerary/{itineraryId}**
- **Description**: Returns the human-readable version of the itinerary based on a sorted list of tickets.
- **Response**:

```json
{
  //same as make endpoints response
}
```

#### 3. **Check Ticket Parser Validation**

- **POST /ticket/parser/check**
- **Description**: Verifies if a given ticket parser works with the provided ticket example.
- **Request Body**:

```json
{
  "Type": "Airplane",
  "OriginKey": "departure_details.departure_airport",
  "DestinationKey": "departure_details.arrival_airport",
  "Helper": "From <departure_details.departure_airport> board the flight <flight_number> to <departure_details.arrival_airport> from gate <departure_details.gate>, seat <seat>.",
  "TicketExample": {
    "flight_number": "XY1234",
    "departure_details": {
      "departure_airport": "Los Angeles",
      "arrival_airport": "New York",
      "departure_time": "2025-12-25T08:30:00",
      "gate": "A12"
    },
    "seat": "21A"
  }
}
```

- **Response**:

```json
{
  "statusCode": 200,
  "data": {
    "isValid": true,
    "parsedData": [
      "Destination= New York",
      "Origin= Los Angeles",
      "helper= From Los Angeles board the flight XY1234 to New York from gate A12, seat 21A."
    ]
  },
  "message": "parser successfully parsed ticket"
}
```

- **on error Response**:

```json
{
  //i change data a little bit to get error
  "statusCode": 200,
  "data": {
    "isValid": false,
    "errorList": [
      "DestinationKey can not be found in ticket example",
      "OriginKey can not be found in ticket example"
    ],
    "parsedData": [
      "helper= From <depture_details.departure_airport> board the flight <flht_number> to <depaure_details.arrival_airport> from gate A12, seat <sat>."
    ]
  },
  "message": "parser cant parse this ticket"
}
```

### Ticket Format

Each ticket should include:

- **Type**: Type of transport (e.g., Airplane, Train, Bus, Taxi, Boat)
- **OriginKey**: Key to access the origin location in the ticket.
- **DestinationKey**: Key to access the destination location in the ticket.
- **Helper**: Human-readable string with placeholders to be replaced (e.g., "From <departure_airport>, board <flight_number> to <arrival_airport>...")

### Example Input for helper

```json
{
  "transportType": "train",
  "ticket": {
    "departure_details": {
      "departure_station": "St. Anton am Arlberg Bahnhof",
      "arrival_station": "Innsbruck Hbf",
      "departure_time": "2025-12-20T10:00:00",
      "arrival_time": "2025-12-20T11:00:00"
    },
    "seat": "17C"
  }
}
```

### Example helper Output

```json
[
  {
    "helper": "Board train RJX 765, Platform 3 from St. Anton am Arlberg Bahnhof to Innsbruck Hbf. Seat number 17C."
  },
  ...
]
```

### Assumptions

- Tickets are provided in an unsorted order.
- Transit types are limited to common methods such as Airplane, Train, Bus, Taxi, Boat.
- The input data contains keys that can be parsed using the specified `Helper` string.

### Adding New Transport Types

To add new transit types, simply create a new `ticketParser` entry for each type with the necessary `Type`, `OriginKey`, `DestinationKey`, and `Helper`. This will allow the API to handle additional transit methods easily.

#### why ticket example should be sent alongside with parser?

- to ensure all key and parser works fine and don't let garbage data add

### Documentation

The API is fully documented using Swagger. You can access it at:

```
http://localhost:3000/api
```

## Recommendations for Further Development

i had some ideas but there was not enough time to completion
my suggestions for Further Development would be:

- Improve Ticket Parsing: ticket parsing can be done with dictionary of relevant keyword so if a ticket is from same transit method but not exact and proper key we are looking can be found with a prediction between available key value.

- Prediction and Recommendations: i had plan to check origin and destination of any travel and get some simple data using google map api. possibility is endless in this approach.

- Real-Time save for future Updates: any failed to parse ticket could be save in a logging system to improve algorithm and add another proper parser.

- Multi-Language Support: as an easy and achievable useful feature.

- Documentation: as i didn't have enough time to make it good enough to satisfy myself i suggest Improve Swagger documentation for better developer experience.

## project directory

```
itinerary_assistant
├─ .prettierrc
├─ eslint.config.mjs
├─ nest-cli.json
├─ package.json
├─ README.md
├─ src
│  ├─ common
│  │  ├─ definitions
│  │  │  ├─ class
│  │  │  │  ├─ itinerary.calss.ts
│  │  │  │  └─ simpleTicket.class.ts
│  │  │  ├─ constant
│  │  │  ├─ interface
│  │  │  │  ├─ itinerary
│  │  │  │  │  └─ createItinerary.ts
│  │  │  │  └─ ticket
│  │  │  │     ├─ addParser.ts
│  │  │  │     ├─ check_parser.ts
│  │  │  │     └─ updateParser.ts
│  │  │  └─ types
│  │  │     ├─ itinerary
│  │  │     │  └─ index.ts
│  │  │     ├─ ticket
│  │  │     │  ├─ index.ts
│  │  │     │  └─ ticket.ts
│  │  │     └─ travels.ts
│  │  ├─ DTO
│  │  │  ├─ itinerary
│  │  │  │  └─ create_itinerary.dto.ts
│  │  │  ├─ response
│  │  │  │  └─ response.dto.ts
│  │  │  └─ ticket
│  │  │     ├─ add_ticket_parser.dto.ts
│  │  │     ├─ get_ticket_list.dto.ts
│  │  │     └─ update_ticket_parser.dto.ts
│  │  ├─ exeptions
│  │  │  └─ index.ts
│  │  ├─ interceptors
│  │  │  └─ response.interceptor.ts
│  │  └─ utils
│  │     ├─ index.ts
│  │     ├─ itinerary
│  │     │  ├─ humanized_itinerary.ts
│  │     │  ├─ manipulate_ticket.ts
│  │     │  └─ sort_itinerary.ts
│  │     ├─ parse_ticket.ts
│  │     └─ ticket
│  │        └─ index.ts
│  ├─ configs
│  │  ├─ app
│  │  │  └─ appConfig.ts
│  │  ├─ swagger
│  │  │  ├─ decorator.ts
│  │  │  ├─ mock.ts
│  │  │  └─ swagger.doc.ts
│  │  └─ test
│  ├─ database
│  │  ├─ Itinerary
│  │  │  └─ Itinerary.entity.ts
│  │  ├─ TicketParser
│  │  │  └─ TicketParser.entity.ts
│  │  └─ transportation
│  │     └─ transportation.entity.ts
│  ├─ main.ts
│  └─ modules
│     ├─ app
│     │  ├─ app.controller.spec.ts
│     │  ├─ app.controller.ts
│     │  ├─ app.module.ts
│     │  └─ app.service.ts
│     ├─ itinerary
│     │  ├─ controllers
│     │  │  ├─ itinerary.controller.spec.ts
│     │  │  └─ itinerary.controller.ts
│     │  ├─ itinerary.module.ts
│     │  └─ services
│     │     ├─ itinerary.service.spec.ts
│     │     └─ itinerary.service.ts
│     ├─ ticket
│     │  ├─ controllers
│     │  │  ├─ ticket.controller.spec.ts
│     │  │  └─ ticket.controller.ts
│     │  ├─ services
│     │  │  ├─ ticket.service.spec.ts
│     │  │  └─ ticket.service.ts
│     │  └─ ticket.module.ts
│     └─ transit
│        ├─ controllers
│        │  ├─ transit.controller.spec.ts
│        │  └─ transit.controller.ts
│        ├─ services
│        │  ├─ transit.service.spec.ts
│        │  └─ transit.service.ts
│        └─ transit.module.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
├─ tsconfig.json
└─ yarn.lock

```

## thanks for your time an effort
