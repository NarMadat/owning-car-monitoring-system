import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import type { ConfigType } from './app.config';

@Injectable()
export class TelegramConfig implements TelegrafOptionsFactory {
  constructor(private configService: ConfigService<ConfigType>) {}

  createTelegrafOptions(): TelegrafModuleOptions {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!token) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    }
    return {
      token,
    };
  }
}