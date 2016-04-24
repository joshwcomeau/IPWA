import React, { PropTypes } from 'react';

const Header = props => (
  <header id="header">
    <h3 className="title">Internet-Powered Wall Art</h3>
    <p className="intro">
      Paint or upload a picture below.
      <br />
      It will be displayed in my kitchen.
      <br />
      (Yes, this is almost certainly a terrible idea.)
    </p>
  </header>
);

export default Header;
