import { Update, Command, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { StatisticsService } from '../statistics/services/statistics.service';

@Update()
export class TelegramUpdate {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Command('stats')
  async onStats(@Ctx() ctx: Context) {
    const stats = await this.statisticsService.getStatistics();
    await ctx.reply(`✅ Completed transactions: ${stats.completed}`);
  }
}