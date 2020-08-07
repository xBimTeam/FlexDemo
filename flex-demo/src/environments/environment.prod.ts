import { IEnvironment } from '@xbim/flex-webkit';
import { baseConfig } from './base';


export const environment: IEnvironment = {
  // We can't use spread operator in AOT
  appName: baseConfig.appName,
  production: true,
  authConfig: baseConfig.authConfig
};
