import { defineEndformConfig } from 'endform';

export default defineEndformConfig({
  // Resolve BDD configuration paths on each remote machine.
  environmentVariables: ['!^PLAYWRIGHT_BDD_CONFIGS$'],
  // BDD loads step definitions by glob rather than static imports.
  additionalFiles: ['features/steps/*.ts'],
});
