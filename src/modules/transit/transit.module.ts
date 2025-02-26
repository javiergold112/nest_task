import { Module } from '@nestjs/common';
import { TransitService } from './services/transit.service';
import { TransitController } from './controllers/transit.controller';

@Module({
  imports: [],
  providers: [TransitService],
  controllers: [TransitController],
})
export class TransitModule {}
