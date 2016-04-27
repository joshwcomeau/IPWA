import 'whatwg-fetch';
import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'store';
import Layout         from 'components/Layout';
import DevTools       from 'components/DevTools';

// TODO: Change to import, if possible
require('./scss/main.scss');

const store = configureStore();

render((
  <Provider store={store}>
    <div>
      <DevTools />
      <Layout />
    </div>
  </Provider>
), document.getElementById('render-target'))
