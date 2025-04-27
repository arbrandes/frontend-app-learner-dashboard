import { ErrorPage, useIntl } from '@openedx/frontend-base';
import { Alert } from '@openedx/paragon';

import Dashboard from './containers/Dashboard';
import { RequestKeys } from './data/constants/requests';
import { reduxHooks } from './hooks';
import messages from './messages';

export const LearnerDashboard = () => {
  const { formatMessage } = useIntl();
  const isFailed = {
    initialize: reduxHooks.useRequestIsFailed(RequestKeys.initialize),
    refreshList: reduxHooks.useRequestIsFailed(RequestKeys.refreshList),
  };
  const hasNetworkFailure = isFailed.initialize || isFailed.refreshList;
  const { supportEmail } = reduxHooks.usePlatformSettingsData();

  return (
    <div id="learnerDashboardRoot">
      <main>
        {hasNetworkFailure
          ? (
            <Alert variant="danger">
              <ErrorPage message={formatMessage(messages['learner-dash.error-page-message'], { supportEmail })} />
            </Alert>
          ) : (
            <Dashboard />
          )}
      </main>
    </div>
  );
};

export default LearnerDashboard;
