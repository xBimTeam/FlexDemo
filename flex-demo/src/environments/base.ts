export const baseConfig = {
    baseUrl: 'https://localhost:4202/',
    appName: 'xbim Flex Webkit Demo app',
    clientId: '853519a5-e1b1-4be8-93b3-ac21a4180294',
    authConfig: {
        silentRefreshPath: '/silent-refresh.html',
        redirectPath: '/',
        scopes: 'openid profile messagehub.read api.write', // api.read, comms.read, comms.write, messagehub.write 
        sessionChecksEnabled: true
    }

};
