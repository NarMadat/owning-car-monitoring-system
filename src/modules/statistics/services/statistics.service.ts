import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../../transactions/services/transactions.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly transactionsService: TransactionsService) {}

  async getStatistics() {
    const transactions = await this.transactionsService.getTransactions();
    return {
      total: transactions.length,
      completed: transactions.filter(t => t.status === 'completed').length,
    };
  }
}