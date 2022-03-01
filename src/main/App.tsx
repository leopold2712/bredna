import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@shopify/polaris/dist/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppLink from '../shared/components/AppLink';
import { AppRouter } from './router/AppRouter';
import './App.scss';
import './network';
import { isAuthenticated } from '../feature/Onboarding/store';

const token = localStorage.getItem('token');

if (token) {
  store.dispatch(isAuthenticated(true));
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <AppProvider i18n={enTranslations} linkComponent={AppLink}>
            <AppRouter />
          </AppProvider>
        </DndProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
