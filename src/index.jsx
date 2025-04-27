import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  AppProvider,
  ErrorPage,
  APP_READY,
  APP_INIT_ERROR,
  getBasename,
  initialize,
  subscribe,
} from '@openedx/frontend-base';
import store from './data/store';
import messages from './i18n';
import routes from './routes';

subscribe(APP_READY, () => {
  const root = createRoot(document.getElementById('root'));
  const router = createBrowserRouter(routes, { basename: getBasename() });

  root.render(
    <StrictMode>
      <AppProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </AppProvider>
    </StrictMode>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <StrictMode>
      <ErrorPage message={error.message} />
    </StrictMode>,
  );
});

initialize({
  messages,
  requireAuthenticatedUser: true,
});
