import { Injectable } from '@nestjs/common';
import { DirectusConfig } from '../../../config/directus.config';
import { Transaction } from '../interfaces/transaction.interface';
import { readItems } from '@directus/sdk';

@Injectable()
export class TransactionsService {
  constructor(private readonly directusConfig: DirectusConfig) {}

  async getTransactions(): Promise<Transaction[]> {
    const client = this.directusConfig.createDirectusClient();
    try {
      const data = await client.request(
        readItems('registry_vehicle_transactions', {
          filter: { status: { _eq: 'completed' } },
        })
      );
      return data as Transaction[];
    } catch (error) {
      console.error('Error transactions fetching:', error);
      return [];
    }
  }
}