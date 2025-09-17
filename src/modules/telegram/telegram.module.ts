import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigService } from '@nestjs/config';
import { TelegramService } from './services/telegram.service';
import { TelegramUpdate } from './telegram.update';
import { StatisticsModule } from '../statistics/statistics.module';
import { NotificationService } from './services/notifications.service';
import { TransactionsService } from '../transactions/services/transactions.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const token = config.get<string>('TELEGRAM_BOT_TOKEN');
        if (!token) {
          throw new Error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
        }
        return { token };
      },
    }),
    StatisticsModule,
    TransactionsModule
  ],
  providers: [TelegramService, TelegramUpdate, NotificationService],
  exports: [TelegramService],
})
export class TelegramModule {}