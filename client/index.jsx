import 'whatwg-fetch';
import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import Layout         from 'components/Layout';

// TODO: Change to import, if possible
require('./scss/main.scss');

const store = configureStore();

render((
  <Provider store={store}>
    <Layout />
  </Provider>
), document.getElementById('render-target'))
