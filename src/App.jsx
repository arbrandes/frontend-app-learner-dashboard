import React from 'react';
import { Helmet } from 'react-helmet';

import { useIntl, logError, ErrorPage, AppContext, EnvironmentTypes } from '@openedx/frontend-base';
import { Alert } from '@openedx/paragon';

import { RequestKeys } from './data/constants/requests';
import store from './data/store';
import {
  selectors,
  actions,
} from './data/redux';
import { reduxHooks } from './hooks';
import Dashboard from './containers/Dashboard';

import track from './tracking';

import fakeData from './data/services/lms/fakeData/courses';

import { getAppConfig, getConfig } from '@openedx/frontend-base';
import messages from './messages';
import './App.scss';

export const App = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { formatMessage } = useIntl();
  const isFailed = {
    initialize: reduxHooks.useRequestIsFailed(RequestKeys.initialize),
    refreshList: reduxHooks.useRequestIsFailed(RequestKeys.refreshList),
  };
  const hasNetworkFailure = isFailed.initialize || isFailed.refreshList;
  const { supportEmail } = reduxHooks.usePlatformSettingsData();
  const loadData = reduxHooks.useLoadData();

  React.useEffect(() => {
    if (authenticatedUser?.administrator || getConfig().environment === EnvironmentTypes.DEVELOPMENT) {
      window.loadEmptyData = () => {
        loadData({ ...fakeData.globalData, courses: [] });
      };
      window.loadMockData = () => {
        loadData({
          ...fakeData.globalData,
          courses: [
            ...fakeData.courseRunData,
            ...fakeData.entitlementData,
          ],
        });
      };
      window.store = store;
      window.selectors = selectors;
      window.actions = actions;
      window.track = track;
    }
  }, [authenticatedUser, loadData]);
  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
        <link rel="shortcut icon" href={getAppConfig('openedxLearnerDashboard').FAVICON_URL} type="image/x-icon" />
      </Helmet>
      <div>
        <main id="main">
          {hasNetworkFailure
            ? (
              <Alert variant="danger">
                <ErrorPage message={formatMessage(messages.errorMessage, { supportEmail })} />
              </Alert>
            ) : (
              <Dashboard />
            )}
        </main>
      </div>
    </>
  );
};

export default App;
