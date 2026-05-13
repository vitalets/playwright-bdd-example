import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MarketConfig } from '../utils/market';
import { replacePackage, replaceXxxx, selectPlatformValue } from '../utils/common';

type LocatorTree = { [key: string]: LocatorTree | string | { [platform: string]: string } };

export class LocatorResolver {
  private readonly tree: LocatorTree;

  constructor(
    private readonly market: MarketConfig,
    locatorsPath = join(process.cwd(), 'src', 'locators', 'app.locators.json'),
  ) {
    this.tree = JSON.parse(readFileSync(locatorsPath, 'utf8')) as LocatorTree;
  }

  resolve(key: string, replacement?: string): string {
    const raw = this.lookup(key);
    if (raw === undefined) {
      // Caller passed a raw XPath instead of a key — treat as literal.
      return replaceXxxx(replacePackage(key, this.market.appPackage), replacement);
    }
    const platformValue = selectPlatformValue(raw as never, this.market.platform);
    return replaceXxxx(replacePackage(platformValue, this.market.appPackage), replacement);
  }

  private lookup(key: string): LocatorTree | string | { [platform: string]: string } | undefined {
    const parts = key.split('.');
    let current: LocatorTree | string | { [platform: string]: string } | undefined = this.tree;
    for (const part of parts) {
      if (typeof current !== 'object' || current === null) return undefined;
      current = (current as LocatorTree)[part];
      if (current === undefined) return undefined;
    }
    return current;
  }
}
