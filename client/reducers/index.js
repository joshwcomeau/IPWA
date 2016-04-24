import { Map } from 'immutable';

import drawingBoard from '../ducks/drawing-board.duck';
import palette from '../ducks/palette.duck';
import upload from '../ducks/upload.duck';


const rootReducer = ( state = Map(), action ) => {
  return Map({
    // Each top-level key here has a child reducer that manages that part
    // of the state. These reducers are defined in their own files, and
    // they take their slice of the state, as well as the action invoked.
    drawingBoard: drawingBoard(
      state.get('drawingBoard'),
      action
    ),
    palette: palette(
      state.get('palette'),
      action
    ),
    upload: upload(
      state.get('upload'),
      action
    )
  });
};

export default rootReducer
