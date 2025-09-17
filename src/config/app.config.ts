import { z } from 'zod';

export const configValidationSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DIRECTUS_URL: z.string(),
  DIRECTUS_TOKEN: z.string(),
  TELEGRAM_BOT_TOKEN: z.string(),
  TELEGRAM_CHAT_ID: z.string(),
});

export type ConfigType = z.infer<typeof configValidationSchema>;