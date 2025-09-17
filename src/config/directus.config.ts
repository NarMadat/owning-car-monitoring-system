import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDirectus, rest, staticToken } from '@directus/sdk';
import type { ConfigType } from './app.config';

@Injectable()
export class DirectusConfig {
  constructor(private configService: ConfigService<ConfigType>) {}

  createDirectusClient() {
    const directusUrl = this.configService.get<string>('DIRECTUS_URL');
    const token = this.configService.get<string>('DIRECTUS_TOKEN');
    if (!directusUrl) {
      throw new Error('DIRECTUS_URL is not defined in the configuration');
    }
    if (!token) {
      throw new Error('DIRECTUS_TOKEN is not defined in the configuration');
    }
    const client = createDirectus(directusUrl)
      .with(rest())
      .with(staticToken(token));

    return client;
  }
}