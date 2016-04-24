// PALETTE
// Contains the various colours (and brush size?) that the user can select,
// as well as their current selection.
import { Map, List, fromJS } from 'immutable';


const initialState = fromJS({
  pixels: []
});


///////////////////////////
// ACTION TYPES //////////
/////////////////////////
export const SELECT_COLOUR  = 'SELECT_COLOUR';


///////////////////////////
// REDUCER ///////////////
/////////////////////////
export default function drawingBoard(state = initialState, action) {
  switch ( action.type ) {
    case SELECT_COLOUR:
      // TODO
    default:
      return state;
  };
}


///////////////////////////
// ACTION CREATORS ///////
/////////////////////////
export function selectColour(colour) {
  return {
    type: SELECT_COLOUR,
    colour
  };
}
