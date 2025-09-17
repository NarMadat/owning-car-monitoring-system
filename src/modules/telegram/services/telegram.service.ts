import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { StatisticsService } from 'src/modules/statistics/services/statistics.service';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
    private readonly configService: ConfigService,
    private readonly statisticsService: StatisticsService,
  ) {}

  async getStatsMessage(): Promise<string> {
    const stats = await this.statisticsService.getStatistics();
    return `✅ Completed transactions: ${stats.completed}`;
  }

  async sendMessage(message: string): Promise<void> {
    const chatId = this.configService.get('TELEGRAM_CHAT_ID');
    await this.bot.telegram.sendMessage(chatId, message, { parse_mode: 'HTML' });
  }
}