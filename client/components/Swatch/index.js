import React, { PropTypes } from 'react';


const Swatch = ({color, onClick}) => (
  <div className="swatch" onClick={onClick}>
    <div className="swatch-inner" style={{ backgroundColor: color }} />
  </div>
)

Swatch.propTypes = {
  color: PropTypes.string.isRequired
}

export default Swatch;
