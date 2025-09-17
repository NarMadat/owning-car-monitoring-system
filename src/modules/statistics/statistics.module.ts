import { Module } from '@nestjs/common';
import { StatisticsService } from './services/statistics.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [TransactionsModule],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}