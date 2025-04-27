import { App } from '@openedx/frontend-base';
import routes from './routes';
import messages from './i18n';

export const appId = 'org.openedx.frontend.app.learnerDashboard';

const app: App = {
  appId,
  routes,
  messages,
  config: {
    ECOMMERCE_BASE_URL: 'http://apps.local.openedx.io:2002',
    FAVICON_URL: 'https://edx-cdn.org/v3/default/favicon.ico',
    LEARNING_BASE_URL: 'http://apps.local.openedx.io:2000',
  }
};

export default app;
