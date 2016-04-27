import React, { PropTypes, Component }  from 'react';

import Palette      from 'components/Palette';
import UploadButton from 'components/UploadButton';
import DrawingBoard from 'components/DrawingBoard';


class MainContent extends Component {
  render() {
    return (
      <section id="main-content">
        <div id="first-row">
          <Palette />
          <UploadButton />
        </div>
        <div id="second-row">
          <DrawingBoard
            style={{border: '1px solid #000'}}
            paintColor='#CCCCCC'
            onChange={this.todo}
          />
        </div>
      </section>
    );
  }
}

export default MainContent;
