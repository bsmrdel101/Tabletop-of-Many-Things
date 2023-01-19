import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './components/App/App';
import './index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);
document.title = 'Tabletop of Many Things';


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
