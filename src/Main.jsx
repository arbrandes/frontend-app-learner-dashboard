import { Provider as ReduxProvider } from 'react-redux';
import { AppProvider, PageWrap } from '@openedx/frontend-base';

import { appId } from './app';
import store from './data/store';
import LearnerDashboard from './LearnerDashboard';

import './app.scss';

const Main = () => (
  <AppProvider appId={appId}>
    <ReduxProvider store={store}>
      <PageWrap>
        <LearnerDashboard />
      </PageWrap>
    </ReduxProvider>
  </AppProvider>
);

export default Main;
