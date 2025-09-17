import { promises as fs } from 'fs';
import * as path from 'path';

const CACHE_PATH = path.resolve(__dirname, '../../../transaction-cache.json');

export async function readCompletedIds(): Promise<Set<string>> {
  try {
    const data = await fs.readFile(CACHE_PATH, 'utf-8');
    const arr = JSON.parse(data);
    return new Set<string>(arr);
  } catch {
    return new Set();
  }
}

export async function writeCompletedIds(ids: Set<string>): Promise<void> {
  const arr = Array.from(ids);
  await fs.writeFile(CACHE_PATH, JSON.stringify(arr), 'utf-8');
}
