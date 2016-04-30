import React, { PropTypes } from 'react';


const Swatch = ({width, height, color, onClick}) => {
  let innerJsx;

  // If the color is 'null', this is our "erase" preset.
  // We want to create a white cell with a red line through it.
  // We'll need to use an SVG for this.

  if ( !color ) {
    innerJsx = (
      <svg
        className="swatch-inner"
        width={width}
        height={height}
        style={{
          overflow: 'hidden'
        }}
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          style={{ stroke: '#FF0000', strokeWidth: '4' }}
        />
        <line
          x1="0"
          y1="0"
          x2={width}
          y2={height}
          style={{ stroke: '#FF0000', strokeWidth: '3' }}
        />
      </svg>
    )
  } else {
    innerJsx = (
      <div className="swatch-inner" style={{ backgroundColor: color }} />
    )
  }

  return (
    <div className="swatch" onClick={onClick}>
      {innerJsx}
    </div>
  )
};

Swatch.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClick: PropTypes.func.isRequired,
}

export default Swatch;
