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
export const UPDATE_DRAWING_BOARD  = 'UPDATE_DRAWING_BOARD';


///////////////////////////
// REDUCER ///////////////
/////////////////////////
export default function drawingBoard(state = initialState, action) {
  switch ( action.type ) {
    case UPDATE_DRAWING_BOARD:
      return state.set('pixels', action.board);
    default:
      return state;
  };
}


///////////////////////////
// ACTION CREATORS ///////
/////////////////////////
export function updateDrawingBoard(board) {
  return {
    type: UPDATE_DRAWING_BOARD,
    board
  };
}
