import { Device } from '../../device/device';
import { AirtimePage } from './airtime.page';
import { appVersionGreaterThan } from '../../utils/common';

export class HomePage {
  constructor(
    private readonly device: Device,
    private readonly airtime: AirtimePage,
  ) {}

  private get market() {
    return this.device.market.name;
  }

  private isNewerThan(threshold: string): boolean {
    return appVersionGreaterThan(this.device.market, threshold);
  }

  async navigateTo(menuItem: string): Promise<void> {
    const mkt = this.market;

    if (menuItem === 'Airtime' && mkt === 'mz') {
      await this.device.tap('Common.NavigateTo', menuItem);
      await this.device.tap('Single top up');
      return;
    }

    if (menuItem === 'Airtime' && mkt === 'drc' && this.isNewerThan('2.15.6')) {
      await this.airtime.dismissToolTip();
      await this.device.tap('Common.NavigateTo', menuItem);
      return;
    }

    if (menuItem === 'Airtime' && mkt === 'lso') {
      await this.airtime.dismissToolTip();
      await this.device.tap('Common.TextView', 'Airtime');
      await this.device.tap('Top up for Self/Others');
      return;
    }

    if (menuItem === 'Airtime' && mkt === 'tz' && this.isNewerThan('2.15.6')) {
      await this.airtime.dismissToolTip();
      await this.device.tap('Common.NavigateTo', 'Bundles');
      return;
    }

    if (menuItem === 'Settings' && this.isNewerThan('2.15.6')) {
      await this.airtime.dismissToolTip();
      if (mkt !== 'lso') {
        const accountKey = `${this.device.testData.getField('AccountNumber') ?? ''} name`;
        const accountName = this.device.testData.identifyData(accountKey);
        await this.device.tap('Common.TextViewContains', `Hello, ${accountName}`);
      } else {
        await this.device.tap('Common.TextViewContains', 'Hello');
      }
      await this.device.wait(5);
      if ((await this.device.grabNumberOfVisibleElements('Common.TextView', 'Got it')) > 0) {
        await this.device.tap('Common.AllowOrDeny');
      }
      return;
    }

    if (menuItem === 'Mipangilio' && this.isNewerThan('2.15.6')) {
      await this.airtime.dismissToolTip();
      const accountKey = `${this.device.testData.getField('AccountNumber') ?? ''} name`;
      const accountName = this.device.testData.identifyData(accountKey);
      await this.device.tap('Common.TextViewContains', `Habari, ${accountName}`);
      await this.device.wait(5);
      if ((await this.device.grabNumberOfVisibleElements('Common.TextView', 'Got it')) > 0) {
        await this.device.tap('Common.AllowOrDeny');
      }
      return;
    }

    if (this.isNewerThan('2.15.6')) await this.airtime.dismissToolTip();
    await this.device.tap('Common.NavigateTo', menuItem);
  }

  async verifyCards(rows: { Cards: string }[]): Promise<void> {
    for (const row of rows) {
      await this.device.waitForText(row.Cards, 'Common.TextView', row.Cards);
      await this.device.see(row.Cards, 'Common.TextView', row.Cards);
    }
  }

  async verifyBundles(rows: { Cards: string }[]): Promise<void> {
    for (const row of rows) {
      await this.device.see(row.Cards, 'Common.RadioBtnWithText', row.Cards);
    }
  }

  async verifyBottomNavigation(rows: { Navigation: string }[]): Promise<void> {
    for (const row of rows) {
      await this.device.seeTextContains(row.Navigation, 'Common.BottomItems', row.Navigation);
    }
  }

  async verifyBalanceHiddenOrNot(type: 'hidden' | 'displayed' | string): Promise<void> {
    await this.device.wait(5);
    const mkt = this.market;

    if (this.isNewerThan('2.15.6') && mkt !== 'lso') {
      const status = await this.device.grabAttribute('Common.VisibilityToggleText', 'text');
      if (type === 'hidden') {
        if (status !== 'Show balance') throw new Error('Balance is not hidden');
        return;
      }
      const balance = await this.device.grabText('Common.HomeAccountBalance');
      this.device.testData.setField('AccountBalance', balance);
      if (status !== 'Hide balance') throw new Error('Balance is not displayed');
      return;
    }

    if (mkt === 'tz') {
      const status = await this.device.grabAttribute('Common.balanceVisibilityToggle', 'enabled');
      if (type === 'hidden') {
        if (status !== 'false') throw new Error('Balance is not hidden');
        return;
      }
      const balance = await this.device.grabText('Common.HomeAccountBalance');
      this.device.testData.setField('AccountBalance', balance);
      if (status !== 'true') throw new Error('Balance is not displayed');
      return;
    }

    if (mkt === 'lso') {
      const status = await this.device.grabAttribute('Common.VisibilityToggleTextLs', 'text');
      if (type === 'hidden') {
        if (status !== 'Show balance') throw new Error('Balance is not hidden');
        return;
      }
      const balance = await this.device.grabText('Common.HomeAccountBalanceLs');
      this.device.testData.setField('AccountBalance', balance);
      if (status !== 'Hide balance') throw new Error('Balance is not displayed');
      return;
    }

    const status = await this.device.grabAttribute('Common.HomeBalanceSwitch', 'checked');
    if (type === 'hidden') {
      if (status !== 'false') throw new Error('Balance is not hidden');
      return;
    }
    const balance = await this.device.grabText('Common.HomeAccountBalance');
    this.device.testData.setField('AccountBalance', balance);
    if (status !== 'true') throw new Error('Balance is not displayed');
  }

  async swipeBalance(side: 'left' | 'right' | string): Promise<void> {
    if (side === 'left') {
      if (this.market === 'drc') await this.device.tap('Common.SwipeRightIcon');
      else await this.device.swipeLeft('Common.TextView', 'Primary wallet');
    } else {
      if (this.market === 'drc') await this.device.tap('Common.SwipeLeftIcon');
      else await this.device.swipeRight('Common.TextView', 'Mokhatlo wallet');
    }
  }

  async tapOnBalanceToggleBtn(): Promise<void> {
    if (this.isNewerThan('2.15.6') && this.market !== 'lso') {
      await this.device.tap('Common.VisibilityToggleIcon');
    } else if (this.market === 'lso') {
      await this.device.tap('Common.VisibilityToggleIconLs');
    } else {
      await this.device.tap('Common.HomeBalanceSwitch');
    }
  }

  async grabAccountBalance(): Promise<void> {
    await this.device.wait(5);
    let balance: string;
    if (this.market === 'lso') {
      balance = await this.device.grabText('Common.HomeAccountBalanceLs');
      balance = balance.replace('M', '').replace(/,/g, '');
    } else {
      const text = await this.device.grabText('Common.HomeAccountBalance');
      balance = text.split(' ')[0].replace(/,/g, '');
    }
    this.device.testData.setField('accountBalance', balance);
  }

  async enterAmountMoreThanAccountBalance(): Promise<void> {
    const accountBalance = Number(this.device.testData.getField<string>('accountBalance')) || 0;
    await this.device.fill('Common.AmountField', String(accountBalance + 1), 'Amount');
  }

  async verifyBalanceText(text: string): Promise<void> {
    await this.device.seeTextContains(text, 'Common.HomeAccountBalance');
  }

  async verifyUserNameDisplayed(): Promise<void> {
    await this.device.wait(3);
    if (!this.isNewerThan('2.15.6')) {
      const accountKey = `${this.device.testData.getField('AccountNumber') ?? ''} name`;
      const accountName = this.device.testData.identifyData(accountKey);
      await this.device.seeTextContains(accountName, 'Common.UserName');
      return;
    }
    await this.airtime.dismissToolTip();
    await this.device.seeElement('Common.TextViewContains', 'Hello');
    if (this.market !== 'lso') {
      const accountKey = `${this.device.testData.getField('AccountNumber') ?? ''} name`;
      const accountName = this.device.testData.identifyData(accountKey);
      await this.device.seeElement('Common.TextViewContains', `Hello, ${accountName}`);
    }
  }

  async swipeDiscoverCard(): Promise<void> {
    await this.device.swipeLeft('Common.DiscoverCardItem');
  }

  async swipeStatements(): Promise<void> {
    let count = await this.device.grabNumberOfVisibleElements('Common.TextViewContains', 'Recipients');
    let i = 0;
    while (count === 0 && i < 3) {
      await this.device.swipeLeft('Common.TextViewContains', 'Services');
      count = await this.device.grabNumberOfVisibleElements('Common.TextViewContains', 'Recipients');
      i += 1;
    }
    await this.device.wait(5);
  }

  async clickOnUserAvatarIcon(): Promise<void> {
    await this.airtime.dismissToolTip();
    const accountKey = `${this.device.testData.getField('AccountNumber') ?? ''} name`;
    const accountName = this.device.testData.identifyData(accountKey);
    await this.device.tap('Common.TextView', `Hello, ${accountName}`);
    await this.device.wait(3);
    if ((await this.device.grabNumberOfVisibleElements('Common.TextView', 'Got it')) > 0) {
      await this.device.tap('Common.AllowOrDeny');
    }
  }

  async closeAllDiscoverItem(): Promise<void> {
    let count = await this.device.grabNumberOfVisibleElements('Common.DiscoverCardItemClose');
    while (count !== 0) {
      await this.device.tap('Common.DiscoverCardItemClose');
      count = await this.device.grabNumberOfVisibleElements('Common.DiscoverCardItemClose');
    }
  }

  async closeDiscoverItem(card: string): Promise<void> {
    await this.device.tap('Common.DiscoverCardItemTitleClose', card);
  }

  async scrollToServices(): Promise<void> {
    await this.device.swipeUp('Common.HomeLabelDiscover');
    await this.device.swipeUp('Common.HomeLabelDiscover');
  }

  async verifyServicesLimit(limit: number | string): Promise<void> {
    const count = await this.device.grabNumberOfVisibleElements('Common.ServicesTitle');
    if (count > Number(limit)) {
      throw new Error(`Services exceed limit ${limit}: found ${count}`);
    }
  }

  async validateHomeScreen(): Promise<void> {
    await this.device.seeElement('Common.Action_intelligent_search');
    await this.device.seeElement('Common.Action_notification_inbox');
    if (this.market !== 'drc') await this.device.seeElement('Common.Action_qr_code');
    const count = await this.device.grabNumberOfVisibleElements('Common.Quick_action');
    if (count !== 4) throw new Error(`Expected 4 quick actions, got ${count}`);
    await this.device.see('Mini statement');
    await this.device.seeElement('Common.ServicesSuggestedTitle');
    await this.device.seeElement('Common.HomeLabelDiscover');
  }

  async tapOnAddOrEditPicture(): Promise<void> {
    for (const label of ['Add picture', 'Edit picture', 'Edit profile']) {
      if ((await this.device.grabNumberOfVisibleElements('Common.TextView', label)) > 0) {
        await this.device.tap('Common.TextView', label);
        return;
      }
    }
  }

  async tapOnLastQuickAction(): Promise<void> {
    await this.device.tapLast('Common.Quick_action');
  }

  async validateMenuIsBold(menu: string): Promise<void> {
    let m = menu;
    if ((this.market === 'tz' || this.market === 'drc') && menu === 'Airtime') m = 'Bundles';
    await this.device.seeElement('Common.MenuLargeView', m);
    const status = await this.device.grabAttribute('Common.MenuLargeView', 'selected', m);
    if (status !== 'true') throw new Error(`Menu ${m} is not selected/bold`);
  }
}
