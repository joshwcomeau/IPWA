import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { PALETTE_COLOURS } from 'config';
import Swatch from 'components/Swatch';

class Palette extends Component {
  renderSwatches() {
    return PALETTE_COLOURS.map( (color, i) => (
      <Swatch
        key={i}
        width={27}
        height={27}
        color={color}
        selected={this.props.selectedColor === color}
        onClick={() => this.props.onChange(color)}
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
