import 'dotenv/config';

export type Market = 'tz' | 'mz' | 'drc' | 'lso' | (string & {});
export type Platform = 'android' | 'ios' | 'web' | 'api' | (string & {});

export interface MarketConfig {
  name: Market;
  platform: Platform;
  environment: string;
  appPackage: string;
  iosBundleId: string;
  dataDir: string;
}

export function loadMarketConfig(platformOverride?: Platform): MarketConfig {
  const platform = (
    platformOverride ||
    (process.env.GAF_APPIUM_PLATFORM as Platform) ||
    'android'
  ).toLowerCase() as Platform;

  return {
    name: (process.env.GAF_MARKET as Market) || 'tz',
    platform,
    environment: process.env.GAF_TEST_ENV || 'qa',
    appPackage: process.env.GAF_APP_PACKAGE || 'com.vodafone.mpesa.tanzania.mat',
    iosBundleId: process.env.GAF_IOS_BUNDLE_ID || '',
    dataDir: process.env.GAF_TEST_DATA_DIR || 'src/config/markets',
  };
}
