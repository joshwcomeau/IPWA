// DRAWING_BOARD
// Our primary canvas area
// The thing that holds the pixels that will be sent to the Pi
import { Map, List, fromJS } from 'immutable';
import { MATRIX_WIDTH, MATRIX_HEIGHT } from 'config';


// TODO: Our initial state needs to hold a black pixel in every spot.
const initialState = fromJS({
  pixels: []
});


///////////////////////////
// ACTION TYPES //////////
/////////////////////////
export const PAINT_PIXEL  = 'PAINT_PIXEL';
export const ERASE_PIXEL  = 'ERASE_PIXEL';
export const CLEAR_BOARD  = 'CLEAR_BOARD';


///////////////////////////
// REDUCER ///////////////
/////////////////////////
export default function drawingBoard(state = initialState, action) {
  switch ( action.type ) {
    case PAINT_PIXEL:
      // TODO
    case ERASE_PIXEL:
      // TODO
    case CLEAR_BOARD:
      // TODO
    default:
      return state;
  };
}


///////////////////////////
// ACTION CREATORS ///////
/////////////////////////
export function paintPixel(coordinates, colour) {
  return {
    type: PAINT_PIXEL,
    coordinates,
    colour
  };
}

export function erasePixel(coordinates) {
  return {
    type: ERASE_PIXEL,
    coordinates
  };
}

export function clearBoard() {
  return {
    type: CLEAR_BOARD
  };
}
