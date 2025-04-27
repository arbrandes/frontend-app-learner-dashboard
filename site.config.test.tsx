import { EnvironmentTypes, SiteConfig } from '@openedx/frontend-base';

const config: SiteConfig = {
  apps: [],

  appId: 'openedxLearnerDashboard',
  environment: EnvironmentTypes.TEST,
  baseUrl: 'http://localhost:8080',
  lmsBaseUrl: 'http://localhost:18000',
  siteName: 'localhost',
  mfeConfigApiUrl: null,
  loginUrl: 'http://localhost:18000/login',
  logoutUrl: 'http://localhost:18000/logout',

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
