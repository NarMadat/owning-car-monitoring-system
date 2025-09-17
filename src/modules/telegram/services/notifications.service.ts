import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TelegramService } from './telegram.service';

@Injectable()
export class NotificationService {
  constructor(private readonly telegramService: TelegramService) {}

  @Cron('0 9,15 * * *')
  async handleMorningNotification() {
    const message = await this.telegramService.getStatsMessage();
    await this.telegramService.sendMessage(message);
  }

//   @Cron('* * * * *')
//   async checkNewCompletedTransactions(){

//   }
}