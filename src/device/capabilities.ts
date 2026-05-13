import { MarketConfig } from '../utils/market';
import { isIOS } from '../utils/common';

export interface AppiumCapabilities {
  platformName: 'Android' | 'iOS';
  'appium:automationName': 'UiAutomator2' | 'XCUITest';
  'appium:deviceName'?: string;
  'appium:udid'?: string;
  'appium:platformVersion'?: string;
  'appium:app'?: string;
  'appium:appPackage'?: string;
  'appium:appActivity'?: string;
  'appium:bundleId'?: string;
  'appium:newCommandTimeout'?: number;
  'appium:noReset'?: boolean;
}

export function buildCapabilities(market: MarketConfig): AppiumCapabilities {
  const appPath = process.env.GAF_APP_PATH;

  if (isIOS(market.platform)) {
    return {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': process.env.GAF_APPIUM_DEVICE_NAME,
      'appium:udid': process.env.GAF_APPIUM_UDID,
      'appium:platformVersion': process.env.GAF_APPIUM_PLATFORM_VERSION,
      'appium:bundleId': market.iosBundleId || process.env.GAF_IOS_BUNDLE_ID,
      'appium:app': appPath,
      'appium:newCommandTimeout': 240,
    };
  }

  return {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.GAF_APPIUM_DEVICE_NAME,
    'appium:udid': process.env.GAF_APPIUM_UDID,
    'appium:platformVersion': process.env.GAF_APPIUM_PLATFORM_VERSION,
    'appium:appPackage': market.appPackage,
    'appium:appActivity': process.env.GAF_APP_ACTIVITY,
    'appium:app': appPath,
    'appium:newCommandTimeout': 240,
    'appium:noReset': process.env.GAF_APP_NO_RESET === 'true',
  };
}
