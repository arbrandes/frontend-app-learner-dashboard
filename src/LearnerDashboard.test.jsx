import { shallow } from '@edx/react-unit-test-utils';

import { useIntl, getSiteConfig } from '@openedx/frontend-base';

import { RequestKeys } from 'data/constants/requests';
import { reduxHooks } from 'hooks';
import Dashboard from 'containers/Dashboard';
import { Main } from './Main';
import messages from './messages';

jest.mock('containers/Dashboard', () => 'Dashboard');
jest.mock('data/redux', () => ({
  selectors: 'redux.selectors',
  actions: 'redux.actions',
  thunkActions: 'redux.thunkActions',
}));
jest.mock('hooks', () => ({
  reduxHooks: {
    useRequestIsFailed: jest.fn(),
    usePlatformSettingsData: jest.fn(),
    useLoadData: jest.fn(),
  },
}));
jest.mock('data/store', () => 'data/store');

jest.mock('@openedx/frontend-base', () => ({
  getSiteConfig: jest.fn(() => ({})),
}));

const loadData = jest.fn();
reduxHooks.useLoadData.mockReturnValue(loadData);

let el;

const supportEmail = 'test-support-url';
reduxHooks.usePlatformSettingsData.mockReturnValue({ supportEmail });

describe('Main router component', () => {
  const { formatMessage } = useIntl();
  describe('component', () => {
    const runBasicTests = () => {
      test('snapshot', () => { expect(el.snapshot).toMatchSnapshot(); });
    };
    describe('no network failure', () => {
      beforeAll(() => {
        reduxHooks.useRequestIsFailed.mockReturnValue(false);
        getSiteConfig.mockReturnValue({});
        el = shallow(<Main />);
      });
      runBasicTests();
      it('loads dashboard', () => {
        const main = el.instance.findByType('main')[0];
        expect(main.children.length).toEqual(1);
        const dashboard = main.children[0].el;
        expect(dashboard.type).toEqual('Dashboard');
        expect(dashboard).toEqual(shallow(<Dashboard />));
      });
    });
    describe('initialize failure', () => {
      beforeAll(() => {
        reduxHooks.useRequestIsFailed.mockImplementation((key) => key === RequestKeys.initialize);
        getSiteConfig.mockReturnValue({});
        el = shallow(<Main />);
      });
      runBasicTests();
      it('loads error page', () => {
        const main = el.instance.findByType('main')[0];
        expect(main.children.length).toEqual(1);
        const alert = main.children[0];
        expect(alert.type).toEqual('Alert');
        expect(alert.children.length).toEqual(1);
        const errorPage = alert.children[0];
        expect(errorPage.type).toEqual('ErrorPage');
        expect(errorPage.props.message).toEqual(formatMessage(messages['learner-dash.error-page-message'], { supportEmail }));
      });
    });
    describe('refresh failure', () => {
      beforeAll(() => {
        reduxHooks.useRequestIsFailed.mockImplementation((key) => key === RequestKeys.refreshList);
        getSiteConfig.mockReturnValue({});
        el = shallow(<Main />);
      });
      runBasicTests();
      it('loads error page', () => {
        const main = el.instance.findByType('main')[0];
        expect(main.children.length).toEqual(1);
        const alert = main.children[0];
        expect(alert.type).toEqual('Alert');
        expect(alert.children.length).toEqual(1);
        const errorPage = alert.children[0];
        expect(errorPage.type).toEqual('ErrorPage');
        expect(errorPage.props.message).toEqual(formatMessage(messages['learner-dash.error-page-message'], { supportEmail }));
      });
    });
  });
});
