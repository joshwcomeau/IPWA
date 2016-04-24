import React, { PropTypes } from 'react';

import Palette      from 'components/Palette';
import UploadButton from 'components/UploadButton';
import DrawingBoard from 'components/DrawingBoard';


const MainContent = props => (
  <section id="main-content">
    <div id="first-row">
      <Palette />
      <UploadButton />
    </div>
    <div id="second-row">
      <DrawingBoard />
    </div>
  </section>
);

export default MainContent;
