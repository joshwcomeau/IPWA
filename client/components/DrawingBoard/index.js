import React, { Component, PropTypes } from 'react';

export default class DrawingBoard extends Component {
  static propTypes = {
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onPaint: PropTypes.func,
    canvasBgColor: PropTypes.string,
    gridLineColor: PropTypes.string,
    paintColor: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    rows: 16,
    cols: 32,
    width: 800,
    height: 400,
    paintColor: '#000000',
    gridLineColor: '#000000',
    style: {},
    onPaint(){ /* no-op */},
    onErase(){ /* no-op */},
    onChange(){ /* no-op */}
  }

  constructor(props) {
    super(props);

    // Create an array of all possible cells. They'll all start out with empty
    // objects, that can be filled in (and reset) by painting/erasing.
    // This may seem wasteful, but even with a large grid (256x256), this only
    // takes 16ms to construct, and uses a couple MB of ram (far less than
    // React itself).
    this.cells = [];
    for ( let x = 0; x < 32; x++ ) {
      let row = [];
      for ( let y = 0; y < 16; y++ ) {
        row.push(null);
      }
      this.cells.push(row);
    }
  }

  componentDidMount() {
    const { canvasBgColor, rows, cols, width, height } = this.props;

    const ctx = this._canvas.getContext('2d');

    scaleCanvas(this._canvas, ctx);

    if ( canvasBgColor ) {
      ctx.fillStyle = canvasBgColor;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = this.props.gridLineColor;


    // Draw our grid
    const rowHeight = height / rows;
    const colWidth = width / cols;
    for ( let r = 1; r < rows; r++ ) {
      ctx.beginPath();
      ctx.moveTo(0, r * rowHeight + .5);
      ctx.lineTo(width, r * rowHeight + .5);
      ctx.stroke();
    }


    for ( let c = 1; c < cols; c++ ) {
      ctx.beginPath();
      ctx.moveTo(c * colWidth + .5, .5);
      ctx.lineTo(c * colWidth + .5, height + .5);
      ctx.stroke();
    }

    this._ctx = ctx;
    this._rowHeight = rowHeight;
    this._colWidth  = colWidth;
  }

  highlightTile(event) {

  }

  paintOrEraseTile(event, mode) {
    const [ cursorX, cursorY ]    = getCursorPosition(event, this._canvas);
    const [ roundedX, roundedY ]  = matchCursorPosToCell({
      cursorX,
      cursorY,
      colWidth: this._colWidth,
      rowHeight: this._rowHeight
    });
    const { x, y, width, height } = getCellBoundingBox(event, {
      x: roundedX,
      y: roundedY,
      colWidth: this._colWidth,
      rowHeight: this._rowHeight
    });

    const cellX = roundedX / this._colWidth;
    const cellY = roundedY / this._rowHeight;

    // If this is a duplicate action (painting a tile that is already that
    // color), we want to avoid actually doing anything.
    const currentVal = this.cells[cellX][cellY];

    if ( mode === 'paint' && currentVal !== this.props.paintColor ) {
      this.cells[cellX][cellY] = this.props.paintColor;
      this._ctx.fillStyle = this.props.paintColor;
      this._ctx.fillRect(x, y, width, height);
      this.props.onPaint(this.cells);
      this.props.onChange(this.cells);
    } else if ( mode === 'erase' && !!currentVal ) {
      this.cells[cellX][cellY] = null;
      this._ctx.clearRect(x, y, width, height);
      this.props.onErase(this.cells);
      this.props.onChange(this.cells);
    }


  }

  clickHandler(event) {
    this.paintOrEraseTile(event, 'paint');
  }

  contextMenuHandler(event) {
    // AKA. right click.
    event.preventDefault();
    this.paintOrEraseTile(event, 'erase');
  }

  moveHandler(event) {
    // Paint if left-click is held
    // Erase if right-click is held
    // Highlight if no button is held
    const buttonHeld = event.which || event.buttons;

    switch ( buttonHeld ) {
      case 1:
        this.paintOrEraseTile(event, 'paint');
        break;
      case 2:
        this.paintOrEraseTile(event, 'erase')
        break;
      default:
        this.highlightTile(event);
    }
  }


  render() {
    return (
      <canvas
        ref={ c => this._canvas = c}
        style={this.props.style}
        width={this.props.width}
        height={this.props.height}
        onClick={::this.clickHandler}
        onMouseMove={::this.moveHandler}
        onContextMenu={::this.contextMenuHandler}
      />
    );
  }

}


// Figure out our backing scale.
// This ensures canvas looks crisp on retina displays, where there are
// in fact 4 on-screen pixels for every 1 calculated pixel.
export function scaleCanvas(canvas, ctx) {
  const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.msBackingStorePixelRatio ||
                            ctx.oBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio || 1;

  const ratio = (window.devicePixelRatio || 1) / backingStoreRatio;

  if ( ratio > 1 ) {
    canvas.style.height = canvas.height + 'px';
    canvas.style.width  = canvas.width + 'px';
    canvas.width  *= ratio;
    canvas.height *= ratio;

    ctx.scale(ratio, ratio);
  }
}

export function getCursorPosition(event, canvas) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return [ x, y ];
}

export function matchCursorPosToCell({ cursorX, cursorY, colWidth, rowHeight }) {
  const x = Math.floor(cursorX / colWidth)  * colWidth;
  const y = Math.floor(cursorY / rowHeight) * rowHeight;

  return [ x, y ];
}

export function getCellBoundingBox(event, { x, y, colWidth, rowHeight }) {
  // We want our tiles to be 1 pixel narrower/shorter than the width/height,
  // so that they don't overlap the grid lines. We also need to offset
  // their x/y coordinates by 1.
  return {
    width:    colWidth  - 1,
    height:   rowHeight - 1,
    x:        x + 1,
    y:        y + 1
  };
}
