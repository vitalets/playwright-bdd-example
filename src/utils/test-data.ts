import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MarketConfig } from './market';

type Json = string | number | boolean | null | { [k: string]: Json } | Json[];

export class TestData {
  private fields = new Map<string, Json>();
  private data: Record<string, Json> = {};

  constructor(private market: MarketConfig) {
    this.loadMarketData();
  }

  private loadMarketData(): void {
    const file = join(this.market.dataDir, `${this.market.name}.json`);
    if (existsSync(file)) {
      this.data = JSON.parse(readFileSync(file, 'utf8')) as Record<string, Json>;
    }
  }

  setField(key: string, value: Json): void {
    this.fields.set(key, value);
  }

  getField<T extends Json = Json>(key: string): T | undefined {
    return this.fields.get(key) as T | undefined;
  }

  getData<T extends Json = Json>(key: string): T | undefined {
    return this.resolveDottedKey(this.data, key) as T | undefined;
  }

  identifyData(value: string): string {
    const fromField = this.getField(value);
    if (fromField !== undefined) return String(fromField);
    const fromData = this.getData(value);
    if (fromData !== undefined) return String(fromData);
    return value;
  }

  private resolveDottedKey(obj: Json, key: string): Json | undefined {
    const parts = key.split('.');
    let current: Json | undefined = obj;
    for (const part of parts) {
      if (current === null || typeof current !== 'object' || Array.isArray(current)) {
        return undefined;
      }
      current = (current as { [k: string]: Json })[part];
      if (current === undefined) return undefined;
    }
    return current;
  }
}
