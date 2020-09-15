
const SANITIZED = '<<Sanitized>>';

/** Sanitises the router actions
 * NGXS Router actions create very large object graphs for the Dev tools which can create performance 
 * issues
 * @param action 
 */
export function actionSanitizer(action: any) {
    return action.type.startsWith('[Router]') ?
        { type: action.type, routerState: SANITIZED } : action;
}

/** Hides the auth token from dev tools state
 * 
 * @param state 
 */
export function stateSanitizer(state: any): any {
    let sanitized = { ...state };

    if (sanitized.router && sanitized.router.state && sanitized.router.state.root) {
        sanitized = {
            ...sanitized,
            router: {
                ...sanitized.router,
                state: {
                    ...sanitized.router.state,
                    root: SANITIZED
                }
            }

        };
    }

    if (sanitized.session && sanitized.session.user && sanitized.session.user.token) {
        sanitized = {
            ...sanitized,
            session: {
                ...sanitized.session,
                user: {
                    ...sanitized.session.user,
                    token: SANITIZED
                }
            }
        };
    }
    return sanitized;
}
