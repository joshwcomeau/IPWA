import React, { PropTypes, Component }  from 'react';
import { bindActionCreators }           from 'redux';
import { connect }                      from 'react-redux';
import { updateDrawingBoard } from 'ducks/drawing-board.duck';

import Palette      from 'components/Palette';
import UploadButton from 'components/UploadButton';
import DrawingBoard from 'components/DrawingBoard';


class MainContent extends Component {
  render() {
    return (
      <section id="main-content">
        <div id="first-row">
          <Palette />
          <UploadButton />
        </div>
        <div id="second-row">
          <DrawingBoard
            style={{border: '1px solid #000'}}
            paintColor='#CCCCCC'
            onChange={this.props.actions.updateDrawingBoard}
          />
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawingBoard: state.get('drawingBoard')
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ updateDrawingBoard }, dispatch);

  return { actions };
}

export default connect( mapStateToProps, mapDispatchToProps )( MainContent );
