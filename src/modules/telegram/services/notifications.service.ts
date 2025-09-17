import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TelegramService } from './telegram.service';
import { TransactionsService } from '../../transactions/services/transactions.service';
import { readCompletedIds, writeCompletedIds } from '../../../shared/utils/transaction-cache.utils';
import { StatisticsService } from 'src/modules/statistics/services/statistics.service';

@Injectable()
export class NotificationService {
  private lastCompletedIds: Set<string> = new Set();
  private cacheLoaded = false;

  constructor(
    private readonly telegramService: TelegramService,
    private readonly transactionsService: TransactionsService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Cron('0 9,15,20 * * *')
  async handleMorningNotification() {
    const message = await this.telegramService.getStatsMessage();
    await this.telegramService.sendMessage(message);
  }

  @Cron('* * * * *')
  async checkNewCompletedTransactions() {
    if (!this.cacheLoaded) {
      this.lastCompletedIds = await readCompletedIds();
      this.cacheLoaded = true;
    }
    const completed = await this.transactionsService.getTransactions();
    const newOnes = completed.filter(t => !this.lastCompletedIds.has(t.id));
    const stats = await this.statisticsService.getStatistics();
    if (newOnes.length > 0) {
      for (const tx of newOnes) {
        await this.telegramService.sendMessage(
          `✅ New completed transaction: #${tx.id}\n📊 Total transactions: ${stats.completed}`
        );
      }
      this.lastCompletedIds = new Set(completed.map(t => t.id));
      await writeCompletedIds(this.lastCompletedIds);
    }
  }
}