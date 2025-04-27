import React from 'react';
import { Helmet } from 'react-helmet';
import { shallow } from '@edx/react-unit-test-utils';

import { useIntl, getConfig } from '@openedx/frontend-base';

import { RequestKeys } from 'data/constants/requests';
import { reduxHooks } from 'hooks';
import Dashboard from 'containers/Dashboard';
import { App } from './App';
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
  getConfig: jest.fn(() => ({})),
}));

const loadData = jest.fn();
reduxHooks.useLoadData.mockReturnValue(loadData);

let el;

const supportEmail = 'test-support-url';
reduxHooks.usePlatformSettingsData.mockReturnValue({ supportEmail });

describe('App router component', () => {
  const { formatMessage } = useIntl();
  describe('component', () => {
    const runBasicTests = () => {
      test('snapshot', () => { expect(el.snapshot).toMatchSnapshot(); });
      it('displays title in helmet component', () => {
        const control = el.instance
          .findByType(Helmet)[0]
          .findByType('title')[0];
        expect(control.children[0].el).toEqual(formatMessage(messages.pageTitle));
      });
    };
    describe('no network failure', () => {
      beforeAll(() => {
        reduxHooks.useRequestIsFailed.mockReturnValue(false);
        getConfig.mockReturnValue({});
        el = shallow(<App />);
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
    describe('no network failure with optimizely url', () => {
      beforeAll(() => {
        reduxHooks.useRequestIsFailed.mockReturnValue(false);
        getConfig.mockReturnValue({ OPTIMIZELY_URL: 'fake.url' });
        el = shallow(<App />);
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
    describe('no network failure with optimizely project id', () => {
      beforeAll(() => {
        reduxHooks.useRequestIsFailed.mockReturnValue(false);
        getConfig.mockReturnValue({ OPTIMIZELY_PROJECT_ID: 'fakeId' });
        el = shallow(<App />);
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
        getConfig.mockReturnValue({});
        el = shallow(<App />);
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
        expect(errorPage.props.message).toEqual(formatMessage(messages.errorMessage, { supportEmail }));
      });
    });
    describe('refresh failure', () => {
      beforeAll(() => {
        reduxHooks.useRequestIsFailed.mockImplementation((key) => key === RequestKeys.refreshList);
        getConfig.mockReturnValue({});
        el = shallow(<App />);
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
        expect(errorPage.props.message).toEqual(formatMessage(messages.errorMessage, { supportEmail }));
      });
    });
  });
});
