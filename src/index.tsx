import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import * as FullStory from '@fullstory/browser';
import reportWebVitals from './reportWebVitals';
import App from './main/App';

import './index.css';

if (process.env.REACT_APP_SENTRY_DSN)
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_PROJECT_ENV,
    enabled: process.env.REACT_APP_PROJECT_ENV !== 'DEV',
  });

if (process.env.REACT_APP_FULLSTORY_ORG)
  FullStory.init({
    orgId: process.env.REACT_APP_FULLSTORY_ORG,
    devMode: process.env.REACT_APP_PROJECT_ENV === 'DEV',
  });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
