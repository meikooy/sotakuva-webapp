import React, {Component, PropTypes} from 'react';

export default class ImageDetail extends Component {

  render() {
    const {image} = this.props;
    const url = `https://sotakuva-api.herokuapp.com/images/${image.objectID}/file?size=thumbnail`;
    return (
      <div className="image-container">
        <div className="image-wrapper">
          <img src={url} alt="" />
        </div>
        <div className="image-details">
        <p className="caption">{image.caption || '-'}</p>
        <h5>Kuvaaja: {image.author || '-'}</h5>

        <h5>Paikka: {image.place || '-'}</h5>

        <h5>Lähde: {image.source || '-'}</h5>
        </div>
      </div>
    );
  }
}
