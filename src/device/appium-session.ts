import { remote } from 'webdriverio';

type RemoteOptions = Parameters<typeof remote>[0];
import { MarketConfig } from '../utils/market';
import { buildCapabilities } from './capabilities';

export async function createAppiumSession(market: MarketConfig): Promise<WebdriverIO.Browser> {
  const host = process.env.APPIUM_HOST || 'localhost';
  const port = Number(process.env.APPIUM_PORT) || 4723;
  const path = process.env.APPIUM_PATH || '/';

  const options: RemoteOptions = {
    hostname: host,
    port,
    path,
    logLevel: (process.env.WDIO_LOG_LEVEL as RemoteOptions['logLevel']) || 'warn',
    capabilities: buildCapabilities(market),
  };

  return remote(options);
}
