// PALETTE
// Contains the various colours (and brush size?) that the user can select,
// as well as their current selection.
import { Map, List, fromJS } from 'immutable';


const initialState = fromJS({});


///////////////////////////
// ACTION TYPES //////////
/////////////////////////
export const TOGGLE_UPLOAD_MODAL  = 'TOGGLE_UPLOAD_MODAL';


///////////////////////////
// REDUCER ///////////////
/////////////////////////
export default function drawingBoard(state = initialState, action) {
  switch ( action.type ) {
    case TOGGLE_UPLOAD_MODAL:
      // TODO
    default:
      return state;
  };
}


///////////////////////////
// ACTION CREATORS ///////
/////////////////////////
export function toggleUploadModal() {
  return {
    type: TOGGLE_UPLOAD_MODAL
  };
}
