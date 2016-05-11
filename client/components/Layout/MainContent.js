import React, { PropTypes, Component }  from 'react';
import debounce from 'lodash/debounce';
import {
  generateGrid,
  modifyCell,
  DrawingBoard
} from 'react-pixel-art';

import { submitPixelMatrix, submitFileForProcessing } from 'utils/api';
import Palette from 'components/Palette';
import Swatch from 'components/Swatch';
import UploadButton from 'components/UploadButton';

import { PALETTE_COLOURS } from 'config';


class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: generateGrid(32, 16),
      selectedColor: PALETTE_COLOURS[0]
    };

    this.updateCells = this.updateCells.bind(this);
    this.updateSelectedColor = this.updateSelectedColor.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.sendCellsToDevice = this.sendCellsToDevice;
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
  }

  uploadFile(ev, input) {
    const formData = new FormData();
    formData.append('image', input.files[0]);

    submitFileForProcessing(formData, json => {
      if (json) {
        this.setState({ cells: json.pixels })
      }
      // TODO: error handling.
    });
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
            canvasBgColor="#000000"
            gridLineColor="#111111"
          />
        </div>
        <div id="side-panel">

          <UploadButton onFileSelect={this.uploadFile} />

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
                swatch={this.state.selectedColor}
                showLabel={true}
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
