// The client sends a 2D array of hex color values.
// We need to convert that to a 3D array of RGB values.
// We also need to convert nulls into our background color (black)
import convert from 'color-convert';
import chunk from 'lodash/chunk';
import imageMagick from 'imagemagick-native';

export function prepareGridForPi(grid) {
  return grid.map(row => (
    row.map(cell => (
      convert.hex.rgb(cell || '000000')
    ))
  ));
}


export function readPixelsFromBuffer(buffer) {
  const rawPixels = imageMagick.getConstPixels({
    srcData: buffer, x: 0, y: 0, columns: 32, rows: 16
  });

  // Imagemagick's `getConstPixels` returns a 1D array of 16-bit rgba values.
  // Convert first to 8-bit hex values, and then split into 2D array.
  let pixels = rawPixels.map(({red, green, blue, opacity}) => (
    '#' + convert.rgb.hex(red, green, blue)
  ))

  pixels = chunk(pixels, 32);

  return pixels;
}
