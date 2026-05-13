import { Device } from '../../device/device';

/**
 * Phase-1 subset of ConsumerLogin from consumerapp/lib/pages/app/login.js.
 * Full port lands in Phase 2 (login + send_money).
 */
export class LoginPage {
  constructor(private readonly device: Device) {}

  async allowPermission(): Promise<void> {
    await this.device.wait(2);
    const hasPermissionDialog = await this.device.grabNumberOfVisibleElements('Common.AllowOrDeny');
    if (hasPermissionDialog === 0) return;

    for (const label of ['Allow', 'Allow While Using App', 'ALLOW', 'ONLY THIS TIME', 'Only this time']) {
      const visible = await this.device.grabNumberOfVisibleElements('Common.AllowBtn', label);
      if (visible > 0) {
        await this.device.tap('Common.AllowBtn', label);
        return;
      }
    }
  }

  async launchAppChooseLanguage(lang: string): Promise<void> {
    await this.device.wait(10);
    await this.device.tap('Common.LanguageSelection', lang);
    await this.device.tap('Common.ContinueBtn');
    await this.device.wait(2);
    while ((await this.device.grabNumberOfVisibleElements('Common.ContinueBtn')) > 0) {
      await this.device.tap('Common.ContinueBtn');
      await this.device.wait(2);
    }
    await this.allowPermission();
    if ((await this.device.grabNumberOfVisibleElements('Common.AcceptBtn')) > 0) {
      await this.device.tap('Common.AcceptBtn');
    }
  }

  async enterPin(pin: string): Promise<void> {
    await this.device.waitForElement('Common.Pinpad_Label', undefined, 40_000);
    const resolved = this.device.testData.identifyData(pin);
    await this.device.tap('Common.padNumber', resolved.substring(0, 1));
    await this.device.tap('Common.padNumber', resolved.substring(1, 2));
    await this.device.tap('Common.padNumber', resolved.substring(2, 3));
    await this.device.tap('Common.padNumber', resolved.substring(3, 4));
    if (this.device.market.name === 'drc') await this.device.tap('Common.Enter');
    await this.device.wait(5);
  }

  async validateWrongPinMessage(): Promise<void> {
    await this.device.waitForText('Incorrect PIN', 'Common.Title', undefined, 45_000);
    await this.device.tap('Common.RetryBtn');
  }

  async validateBiometricScreen(): Promise<void> {
    await this.device.waitForInvisible('//*[contains(@text,"Verifying your PIN")]');
    const grantPermission = await this.device.grabNumberOfVisibleElements('Common.GrantPermission');
    if (grantPermission > 0) await this.allowPermission();
  }

  async changeNetworkSettings(state: 'Network' | 'No Network' | 'Wifi' | 'Data' | 'Airplane'): Promise<void> {
    await this.device.setNetworkConnection(state);
  }

  async launchApp(): Promise<void> {
    await this.device.launchApp();
  }

  async launchAppAgainChooseLanguage(lang: string): Promise<void> {
    await this.device.launchApp();
    await this.launchAppChooseLanguage(lang);
  }
}
