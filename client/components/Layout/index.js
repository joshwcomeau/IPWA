import React, { Component } from 'react';

import Header       from './Header';
import MainContent  from './MainContent';
import Footer       from './Footer';


class Layout extends Component {
  render() {
    return (
      <div id="app">
        <Header />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

export default Layout;
