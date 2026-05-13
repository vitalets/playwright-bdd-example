import { LocatorResolver } from '../locators/locator-resolver';
import { TestData } from '../utils/test-data';
import { MarketConfig } from '../utils/market';
import { isIOS, sleep } from '../utils/common';

export interface Point {
  x: number;
  y: number;
}

const DEFAULT_EXPLICIT_WAIT_MS = Number(process.env.GAF_EXPLICIT_WAIT_MS) || 30_000;

export class Device {
  constructor(
    public readonly browser: WebdriverIO.Browser,
    public readonly locators: LocatorResolver,
    public readonly testData: TestData,
    public readonly market: MarketConfig,
  ) {}

  // ---------- Locator + element helpers ----------

  private resolveSelector(keyOrXpath: string, replacement?: string): string {
    return this.locators.resolve(keyOrXpath, replacement);
  }

  async $(keyOrXpath: string, replacement?: string): Promise<WebdriverIO.Element> {
    const el = await this.browser.$(this.resolveSelector(keyOrXpath, replacement));
    return el as unknown as WebdriverIO.Element;
  }

  async $$(keyOrXpath: string, replacement?: string): Promise<WebdriverIO.Element[]> {
    const els = await this.browser.$$(this.resolveSelector(keyOrXpath, replacement));
    return Array.from(els) as unknown as WebdriverIO.Element[];
  }

  async waitForElement(
    keyOrXpath: string,
    replacement?: string,
    timeoutMs = DEFAULT_EXPLICIT_WAIT_MS,
  ): Promise<WebdriverIO.Element> {
    const el = await this.$(keyOrXpath, replacement);
    await el.waitForExist({ timeout: timeoutMs });
    return el;
  }

  async waitForInvisible(
    keyOrXpath: string,
    replacement?: string,
    timeoutMs = DEFAULT_EXPLICIT_WAIT_MS,
  ): Promise<void> {
    const el = await this.$(keyOrXpath, replacement);
    await el.waitForDisplayed({ timeout: timeoutMs, reverse: true });
  }

  async waitForText(
    text: string,
    keyOrXpath?: string,
    replacement?: string,
    timeoutMs = DEFAULT_EXPLICIT_WAIT_MS,
  ): Promise<void> {
    const resolved = this.testData.identifyData(text);
    const el = await this.waitForElement(keyOrXpath ?? '//*[@text]', replacement, timeoutMs);
    await this.browser.waitUntil(
      async () => {
        const actual = await el.getText();
        return actual?.includes(resolved);
      },
      { timeout: timeoutMs, timeoutMsg: `Timed out waiting for text "${resolved}"` },
    );
  }

  // ---------- Actions ----------

  async tap(keyOrXpath: string, replacement?: string): Promise<void> {
    const el = await this.waitForElement(keyOrXpath, replacement);
    await el.click();
  }

  async tapLast(keyOrXpath: string, replacement?: string): Promise<void> {
    const els = await this.$$(keyOrXpath, replacement);
    if (els.length === 0) throw new Error(`No elements found for ${keyOrXpath}`);
    await els[els.length - 1].click();
  }

  async tapCoordinates(x: number, y: number): Promise<void> {
    await this.browser.action('pointer')
      .move({ x, y })
      .down({ button: 0 })
      .pause(50)
      .up({ button: 0 })
      .perform();
    await sleep(500);
  }

  async fill(keyOrXpath: string, value: string, replacement?: string): Promise<void> {
    const resolved = this.testData.identifyData(value);
    const el = await this.waitForElement(keyOrXpath, replacement);
    await el.setValue(resolved);
  }

  async clear(keyOrXpath: string, replacement?: string): Promise<void> {
    const el = await this.waitForElement(keyOrXpath, replacement);
    await el.clearValue();
  }

  async pressKey(_key: string): Promise<void> {
    // Android-only convenience hook; expand as needed.
    if (isIOS(this.market.platform)) return;
    // 66 = ENTER on Android keycode table.
    await (this.browser as unknown as { pressKeyCode: (k: number) => Promise<void> }).pressKeyCode(
      Number(_key) || 66,
    );
  }

  async hideKeyboard(): Promise<void> {
    try {
      await this.browser.hideKeyboard();
    } catch {
      // No keyboard present — ignore.
    }
  }

  async back(): Promise<void> {
    await this.browser.back();
  }

  // ---------- Assertions ----------

  async see(text: string, keyOrXpath?: string, replacement?: string): Promise<void> {
    const expected = this.testData.identifyData(text);
    if (keyOrXpath) {
      const el = await this.waitForElement(keyOrXpath, replacement);
      const actual = await el.getText();
      if (!actual?.includes(expected)) {
        throw new Error(`Expected text "${expected}" in element ${keyOrXpath}, got "${actual}"`);
      }
      return;
    }
    // Fallback: any element on screen containing the text.
    await this.waitForElement(`//*[contains(@text,"${expected}") or contains(@label,"${expected}")]`);
  }

  async dontSee(text: string, keyOrXpath?: string, replacement?: string): Promise<void> {
    const expected = this.testData.identifyData(text);
    if (keyOrXpath) {
      const els = await this.$$(keyOrXpath, replacement);
      for (const el of els) {
        const actual = await el.getText().catch(() => '');
        if (actual?.includes(expected)) {
          throw new Error(`Did not expect text "${expected}" in element ${keyOrXpath}`);
        }
      }
      return;
    }
    const els = await this.$$(`//*[contains(@text,"${expected}") or contains(@label,"${expected}")]`);
    if (els.length > 0) throw new Error(`Did not expect text "${expected}" anywhere on screen`);
  }

  async seeElement(keyOrXpath: string, replacement?: string): Promise<void> {
    const el = await this.waitForElement(keyOrXpath, replacement);
    if (!(await el.isDisplayed())) {
      throw new Error(`Element ${keyOrXpath} not visible`);
    }
  }

  async dontSeeElement(keyOrXpath: string, replacement?: string): Promise<void> {
    const els = await this.$$(keyOrXpath, replacement);
    for (const el of els) {
      if (await el.isDisplayed().catch(() => false)) {
        throw new Error(`Element ${keyOrXpath} unexpectedly visible`);
      }
    }
  }

  async seeTextContains(text: string, keyOrXpath: string, replacement?: string): Promise<void> {
    const expected = this.testData.identifyData(text);
    const el = await this.waitForElement(keyOrXpath, replacement);
    const actual = (await el.getText()) ?? '';
    if (!actual.toLowerCase().includes(expected.toLowerCase())) {
      throw new Error(`Expected text containing "${expected}" in ${keyOrXpath}, got "${actual}"`);
    }
  }

  async seeTextEquals(text: string, keyOrXpath: string, replacement?: string): Promise<void> {
    const expected = this.testData.identifyData(text);
    const el = await this.waitForElement(keyOrXpath, replacement);
    const actual = await el.getText();
    if (actual !== expected) {
      throw new Error(`Expected text "${expected}" in ${keyOrXpath}, got "${actual}"`);
    }
  }

  // ---------- Grabbers ----------

  async grabText(keyOrXpath: string, replacement?: string): Promise<string> {
    const el = await this.waitForElement(keyOrXpath, replacement);
    return (await el.getText()) ?? '';
  }

  async grabAttribute(
    keyOrXpath: string,
    attribute: string,
    replacement?: string,
  ): Promise<string> {
    const el = await this.waitForElement(keyOrXpath, replacement);
    return (await el.getAttribute(attribute)) ?? '';
  }

  async grabNumberOfVisibleElements(keyOrXpath: string, replacement?: string): Promise<number> {
    const els = await this.$$(keyOrXpath, replacement);
    let count = 0;
    for (const el of els) {
      if (await el.isDisplayed().catch(() => false)) count += 1;
    }
    return count;
  }

  async grabElementRect(
    keyOrXpath: string,
    replacement?: string,
  ): Promise<{ x: number; y: number; width: number; height: number }> {
    const el = await this.waitForElement(keyOrXpath, replacement);
    const rect = await el.getElementRect(el.elementId);
    return rect;
  }

  // ---------- Gestures ----------

  async performSwipe(from: Point, to: Point, durationMs = 400): Promise<void> {
    await this.browser
      .action('pointer')
      .move({ x: from.x, y: from.y })
      .down({ button: 0 })
      .pause(50)
      .move({ duration: durationMs, x: to.x, y: to.y })
      .up({ button: 0 })
      .perform();
  }

  async swipeUp(keyOrXpath: string, replacement?: string): Promise<void> {
    const rect = await this.grabElementRect(keyOrXpath, replacement);
    const sourceX = rect.x + rect.width / 2;
    const sourceY = rect.y + rect.height / 2;
    await this.performSwipe({ x: sourceX, y: sourceY }, { x: sourceX, y: sourceY - sourceY / 2 });
  }

  async swipeDown(keyOrXpath: string, replacement?: string): Promise<void> {
    const rect = await this.grabElementRect(keyOrXpath, replacement);
    const sourceX = rect.x + rect.width / 2;
    const sourceY = rect.y + rect.height / 2;
    await this.performSwipe({ x: sourceX, y: sourceY }, { x: sourceX, y: sourceY + sourceY / 2 });
  }

  async swipeLeft(keyOrXpath: string, replacement?: string): Promise<void> {
    const rect = await this.grabElementRect(keyOrXpath, replacement);
    const sourceX = rect.x + rect.width / 2;
    const sourceY = rect.y + rect.height / 2;
    await this.performSwipe({ x: sourceX, y: sourceY }, { x: sourceX - sourceX / 2, y: sourceY });
  }

  async swipeRight(keyOrXpath: string, replacement?: string): Promise<void> {
    const rect = await this.grabElementRect(keyOrXpath, replacement);
    const sourceX = rect.x + rect.width / 2;
    const sourceY = rect.y + rect.height / 2;
    await this.performSwipe({ x: sourceX, y: sourceY }, { x: sourceX + sourceX / 2, y: sourceY });
  }

  async swipeUpUntilVisible(
    keyOrXpath: string,
    replacement?: string,
    maxSwipes = 7,
  ): Promise<void> {
    for (let i = 0; i < maxSwipes; i += 1) {
      if ((await this.grabNumberOfVisibleElements(keyOrXpath, replacement)) > 0) return;
      await this.performSwipe({ x: 350, y: 1200 }, { x: 350, y: 400 });
    }
  }

  async scrollIntoView(keyOrXpath: string, replacement?: string): Promise<void> {
    if (isIOS(this.market.platform)) {
      await this.swipeUpUntilVisible(keyOrXpath, replacement);
      return;
    }
    const selector = this.locators.resolve(keyOrXpath, replacement);
    await this.browser.$(
      `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().xpath("${selector.replace(
        /"/g,
        '\\"',
      )}"))`,
    );
  }

  // ---------- App lifecycle ----------

  appId(): string {
    return isIOS(this.market.platform)
      ? this.market.iosBundleId || this.market.appPackage
      : this.market.appPackage;
  }

  async launchApp(): Promise<void> {
    await this.browser.execute('mobile: activateApp', { appId: this.appId() });
  }

  async terminateApp(): Promise<void> {
    await this.browser.execute('mobile: terminateApp', { appId: this.appId() });
  }

  async resetApp(): Promise<void> {
    await this.terminateApp();
    await sleep(1000);
    await this.launchApp();
  }

  async setNetworkConnection(state: 'Network' | 'No Network' | 'Wifi' | 'Data' | 'Airplane'): Promise<void> {
    if (isIOS(this.market.platform)) return;
    const map: Record<string, number> = {
      'No Network': 0,
      Airplane: 1,
      Wifi: 2,
      Data: 4,
      Network: 6,
    };
    const value = map[state] ?? 6;
    await (
      this.browser as unknown as { setNetworkConnection: (n: number) => Promise<void> }
    ).setNetworkConnection(value);
  }

  async wait(seconds: number | string): Promise<void> {
    await sleep(Number(seconds) * 1000);
  }
}
