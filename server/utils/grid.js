// The client sends a 2D array of hex color values.
// We need to convert that to a 3D array of RGB values.
// We also need to convert nulls into our background color (black)
import convert from 'color-convert';


export function prepareGrid(grid) {
  return grid.map(row => (
    row.map(cell => (
      convert.hex.rgb(cell || '000000')
    ))
  ));
}
