import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import RouterWrapper from './router';
import './index.css';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <RouterWrapper />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
