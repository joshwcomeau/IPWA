import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { PALETTE_COLOURS } from 'config';
import Swatch from 'components/Swatch';

class Palette extends Component {
  renderSwatches() {
    return PALETTE_COLOURS.map( (colour, i) => (
      <Swatch
        key={i}
        colour={colour}
        selected={this.props.selectedColour === colour}
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
