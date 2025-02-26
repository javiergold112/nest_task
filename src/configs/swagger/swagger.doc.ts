import { HttpStatus } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperationOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';

type summaryOP = {
  operation: ApiOperationOptions;
  response: ApiResponseOptions;
};
const swaggerBaseData = {
  title: 'itinerary assistant',
  description: 'The itinerary API description',
};
const SW = {
  itineraryAdd: [ApiResponse({ status: 200 })],
  itineraryGet: [ApiResponse({ status: 300, description: 'test33' })],
  ticketAdd: [],
  ticketGetAll: [],
  ticketCheck: [],
  ticketGetOne: [],
  ticketUpdate: [
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'ticket update failed',
    }),
    ApiOkResponse({ description: 'ticket update success' }),
  ],
  ticketDelete: [ApiResponse({ status: 200, example: { test: 'test' } })],
} as const;
type keyOfSw = keyof typeof SW;
export { swaggerBaseData, SW, keyOfSw };
