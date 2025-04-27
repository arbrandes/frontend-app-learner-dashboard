import { EnvironmentTypes, SiteConfig, footerApp, headerApp, shellApp } from '@openedx/frontend-base';

import { learnerDashboardApp } from './src';

import './src/app.scss';

const siteConfig: SiteConfig = {
  siteId: 'learner-dashboard-dev',
  siteName: 'Learner Dashboard Dev',
  baseUrl: 'http://apps.local.openedx.io:1996',
  lmsBaseUrl: 'http://local.openedx.io:8000',
  loginUrl: 'http://local.openedx.io:8000/login',
  logoutUrl: 'http://local.openedx.io:8000/logout',

  environment: EnvironmentTypes.DEVELOPMENT,
  basename: '/learner-dashboard',
  apps: [
    shellApp,
    headerApp,
    footerApp,
    learnerDashboardApp
  ],
  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
};

export default siteConfig;
