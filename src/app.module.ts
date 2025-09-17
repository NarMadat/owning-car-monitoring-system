import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { configValidationSchema } from './config/app.config';
import { TelegramConfig } from './config/telegram.config';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validate: (config) => configValidationSchema.parse(config),
      isGlobal: true,
    }),
    TransactionsModule,
    StatisticsModule,
    TelegramModule,
  ],
})
export class AppModule {}