import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class UploadButton extends Component {
  render() {
    return (
      <div id="upload-button">
        Upload Photo
        <input
          type="file"
          onChange={ev => this.props.onFileSelect(ev, this._input)}
          ref={i => this._input = i}
        />
      </div>
    );
  }
}

UploadButton.propTypes = {
  onFileSelect: PropTypes.func.isRequired
};

export default UploadButton;
