import { applyDecorators, Type } from '@nestjs/common';
import { SW, keyOfSw } from './swagger.doc';

export const ApiDocDecorator = (decorator: keyOfSw) => {
  return applyDecorators(...SW[decorator]);
};
