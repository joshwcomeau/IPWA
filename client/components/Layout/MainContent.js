import React, { PropTypes } from 'react';

import Palette      from 'components/Palette';
import UploadButton from 'components/UploadButton';
import DrawingBoard from 'components/DrawingBoard';


const MainContent = props => (
  <section>
    <Palette />
    <UploadButton />
    <DrawingBoard />
  </section>
);

export default MainContent;
