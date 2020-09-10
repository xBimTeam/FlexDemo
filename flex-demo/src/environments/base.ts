import * as packageJson from '../../package.json';

const base = document.querySelector('base');

export const baseConfig = {
    baseUrl: (base && base.href) || window.location.origin + '/',
    appName: 'xbim Flex Webkit Demo app',
    // clientId: '853519a5-e1b1-4be8-93b3-ac21a4180294',
    authConfig: {
        silentRefreshPath: '/silent-refresh.html',
        redirectPath: '/',
        scopes: 'openid profile messagehub.read api.write', // api.read, comms.read, comms.write, messagehub.write 
        sessionChecksEnabled: false
    },
    versions: {
        app: packageJson.version,
        angular: packageJson.dependencies['@angular/core'],
        ngxs: packageJson.dependencies['@ngxs/store'],
        material: packageJson.dependencies['@angular/material'],
        rxjs: packageJson.dependencies.rxjs,
        flexWebkit: packageJson.dependencies['@xbim/flex-webkit'],
        flexApi: packageJson.dependencies['@xbim/flex-api'],
        xbimViewer: packageJson.dependencies['@xbim/viewer'],
    }

};
