import React, { PropTypes } from 'react';


const Swatch = ({colour}) => (
  <div className="swatch">
    <div className="swatch-inner" style={{ backgroundColor: colour }} />
  </div>
)

Swatch.propTypes = {
  colour: PropTypes.string.isRequired
}

export default Swatch;
