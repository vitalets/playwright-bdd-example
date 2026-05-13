import { Device } from '../../device/device';

export class AirtimePage {
  constructor(private readonly device: Device) {}

  async dismissToolTip(): Promise<void> {
    await this.device.wait(2);
    const toolTip = await this.device.grabNumberOfVisibleElements('Common.TooltipText');
    if (toolTip > 0) await this.device.tap('Common.TooltipText');
    await this.device.tapCoordinates(600, 50);
  }
}
