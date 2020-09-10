import { IEnvironment } from '@xbim/flex-webkit';
import { baseConfig } from './base';


export const environment: IEnvironment = {
  ...baseConfig,
  production: true,
  authConfig: baseConfig.authConfig
};
