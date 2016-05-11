import React, { PropTypes } from 'react';


const Swatch = ({width, height, swatch, onClick, showLabel}) => {
  let innerJsx;

  // If the color is 'null', this is our "erase" preset.
  // We want to create a white cell with a red line through it.
  // We'll need to use an SVG for this.

  if ( !swatch.color ) {
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
    const labelJsx = (
      <div
        className="swatch-label"
        style={{color: swatch.labelTextColor}}
      >
        {swatch.labelText}
      </div>
    )

    innerJsx = (
      <div className="swatch-inner" style={{ backgroundColor: swatch.color }}>
        { showLabel ? labelJsx : null}
      </div>
    )
  }

  return (
    <div className="swatch" onClick={onClick}>
      {innerJsx}
    </div>
  )
};

Swatch.propTypes = {
  swatch: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default Swatch;
