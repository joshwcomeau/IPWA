import 'whatwg-fetch';
import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

import Layout         from 'components/Layout';

// TODO: Change to import, if possible
require('./scss/main.scss');


render((
  <Layout />
), document.getElementById('render-target'))
