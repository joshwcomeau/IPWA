import 'whatwg-fetch';
import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import Home from './components/Home';

// TODO: Change to import, if possible
require('./scss/main.scss');

const store = configureStore();

render((
  <Provider store={store}>
    <Home />
  </Provider>
), document.getElementById('render-target'))
