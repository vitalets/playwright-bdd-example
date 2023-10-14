import { Fixture, Given, When, Then } from 'playwright-bdd/decorators';
import type { test } from './fixtures';

class Common {}

export 
@Fixture<typeof test>('modelBuildModal')
class ModelBuildModal extends Common {

  @Given('step from modelBuildModal')
  async step() {}
}

export 
@Fixture<typeof test>('modelCenter') 
class ModelCenter extends ModelBuildModal {
  
  @Given('step from modelCenter')
  async step() {}
}

export 
@Fixture<typeof test>('modelCompare') 
class ModelCompare extends ModelCenter {}