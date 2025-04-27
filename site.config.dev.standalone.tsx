import { EnvironmentTypes, SiteConfig } from '@openedx/frontend-base';

const config: SiteConfig = {
  apps: [],

  appId: 'openedxLearnerDashboard',
  environment: EnvironmentTypes.DEVELOPMENT,
  baseUrl: 'http://apps.local.openedx.io:8080',
  lmsBaseUrl: 'http://local.openedx.io:8000',
  siteName: 'My Open edX Site',
  mfeConfigApiUrl: 'http://apps.local.openedx.io:8080/api/mfe_config/v1',
  loginUrl: 'http://local.openedx.io:8000/login',
  logoutUrl: 'http://local.openedx.io:8000/logout',

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
  segmentKey: '',

  custom: {
    appId: 'openedxLearnerDashboard',
    ECOMMERCE_BASE_URL: 'http://localhost:18130',
    FAVICON_URL: 'https://edx-cdn.org/v3/default/favicon.ico',
    LEARNING_BASE_URL: 'http://localhost:2000',
  }
};

export default config;
