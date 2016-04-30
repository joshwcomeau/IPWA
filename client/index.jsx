import 'whatwg-fetch';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Layout from 'components/Layout';

import 'scss/main.scss';


render((
  <Layout />
), document.getElementById('render-target'))
