import React, { PropTypes, Component }  from 'react';
import debounce from 'lodash/debounce';
import {
  generateGrid,
  modifyCell,
  DrawingBoard
} from 'react-pixel-art';

import { submitPixelMatrix } from 'utils/api'
import Palette      from 'components/Palette';
import Swatch      from 'components/Swatch';
import UploadButton from 'components/UploadButton';


class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: generateGrid(32, 16),
      selectedColor: '#fbdd12'
    };

    this.updateCells = this.updateCells.bind(this);
    this.updateSelectedColor = this.updateSelectedColor.bind(this);
    this.sendCellsToDevice = debounce(this.sendCellsToDevice, 500);
  }

  updateSelectedColor(color) {
    this.setState({ selectedColor: color});
  }

  updateCells(coords, eventType) {
    let cells;
    switch (eventType) {
      case 'left-click':
        cells = modifyCell(this.state.cells, {
          newValue: this.state.selectedColor,
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
      // TODO: Error handling
    })
  }

  render() {
    return (
      <section id="main-content">
        <div id="main-panel">
          <DrawingBoard
            width={640}
            height={320}
            cells={this.state.cells}
            onChange={this.updateCells}
            canvasBgColor="#111111"
          />
        </div>
        <div id="side-panel">
          <UploadButton />
          <div id="palette-wrapper">
            <h4 className="panel-box-header">Palette</h4>
            <Palette
              selectedColor={this.state.selectedColor}
              onChange={this.updateSelectedColor}
            />
            <div className="selected-color-wrapper" >
              <Swatch
                width={168}
                height={48}
                color={this.state.selectedColor}
              />
            </div>
          </div>

          <div id="brush-wrapper">
          </div>

        </div>
      </section>
    );
  }
}

export default MainContent;
