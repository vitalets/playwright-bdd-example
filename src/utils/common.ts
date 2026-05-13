import { MarketConfig, Platform } from './market';

export function isIOS(platform: Platform): boolean {
  return platform.toLowerCase() === 'ios';
}

export function isAndroid(platform: Platform): boolean {
  return platform.toLowerCase() === 'android';
}

type PlatformValue = string | { [platform: string]: PlatformValue };

export function selectPlatformValue(value: PlatformValue, platform: Platform): string {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return value as unknown as string;
  }

  const aliases = isIOS(platform) ? ['ios', 'iOS', 'IOS'] : [platform, 'Android', 'android'];
  for (const alias of aliases) {
    const v = (value as { [k: string]: PlatformValue })[alias];
    if (typeof v !== 'undefined') return v as string;
  }
  const fallback =
    (value as { [k: string]: PlatformValue }).android ||
    (value as { [k: string]: PlatformValue }).Android ||
    (value as { [k: string]: PlatformValue }).default;
  if (typeof fallback !== 'undefined') return fallback as string;
  throw new Error(`No locator value configured for platform "${platform}"`);
}

export function replacePackage(xpath: string, appPackage: string): string {
  if (typeof xpath !== 'string' || !xpath.includes('PACKAGE')) return xpath;
  return xpath.replace(/PACKAGE/g, appPackage);
}

export function replaceXxxx(xpath: string, replacement?: string): string {
  if (typeof xpath !== 'string' || replacement === undefined) return xpath;
  return xpath.replace(/xxxx/g, replacement);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseAppVersion(market: MarketConfig, fallback = '0'): string {
  const match = market.appPackage.match(/\b\d+\.\d+\.\d+\b/);
  return match?.[0] ?? process.env.GAF_APP_VERSION ?? fallback;
}

export function appVersionGreaterThan(market: MarketConfig, threshold: string): boolean {
  return parseFloat(parseAppVersion(market)) > parseFloat(threshold);
}
