import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { DirectusConfig } from '../../config/directus.config';

@Module({
  providers: [TransactionsService, DirectusConfig],
  exports: [TransactionsService],
})
export class TransactionsModule {}