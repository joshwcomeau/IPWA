import React, { PropTypes, Component }  from 'react';
import debounce from 'lodash/debounce';
import {
  generateGrid,
  modifyCell,
  DrawingBoard
} from 'react-pixel-art';

import { submitPixelMatrix } from 'utils/api'
import Palette      from 'components/Palette';
import UploadButton from 'components/UploadButton';


class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: generateGrid(32, 16)
    };

    this.updateCells = this.updateCells.bind(this);
    this.sendCellsToDevice = debounce(this.sendCellsToDevice, 500);
  }

  updateCells(coords, eventType) {
    let cells;
    switch (eventType) {
      case 'left-click':
        cells = modifyCell(this.state.cells, {
          newValue: '#FF0000',
          ...coords
        });
        this.setState({ cells })
        break;
      case 'right-click':
        cells = modifyCell(this.state.cells, coords);
        this.setState({ cells })
        break;
    }

    this.sendCellsToDevice();
  }

  sendCellsToDevice() {
    submitPixelMatrix(this.state.cells, response => {
      console.log("Matrix response", response, arguments)
    })
  }

  render() {
    return (
      <section id="main-content">
        <div id="first-row">
          <Palette />
          <UploadButton />
        </div>
        <div id="second-row">
          <DrawingBoard
            width={640}
            height={320}
            cells={this.state.cells}
            onChange={this.updateCells}
          />
        </div>
      </section>
    );
  }
}

export default MainContent;
