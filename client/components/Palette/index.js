import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { PALETTE_COLOURS } from 'config';
import Swatch from 'components/Swatch';

class Palette extends Component {
  renderSwatches() {
    return PALETTE_COLOURS.map( (swatch, i) => (
      <Swatch
        key={i}
        width={27}
        height={27}
        swatch={swatch}
        selected={this.props.selectedColor === swatch}
        onClick={() => this.props.onChange(swatch)}
      />
    ));
  }

  render() {
    return (
      <div id="palette">
        { this.renderSwatches() }
      </div>
    );
  }
}

export default Palette;
