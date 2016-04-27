import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class UploadButton extends Component {
  onChange(ev) {
    console.log("Selected file:", ev.target.files);
  }
  render() {
    return (
      <div id="upload-button">
        Upload Photo
        <input type="file" onChange={this.onChange} />
      </div>
    );
  }
}

export default UploadButton;
