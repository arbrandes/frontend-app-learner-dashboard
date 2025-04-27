import { PageWrap } from '@openedx/frontend-base';
import App from './App';

const routes = [
  {
    id: 'learnerDashboard',
    path: '/',
    element: (<PageWrap><App /></PageWrap>),
  }
];

export default routes;

