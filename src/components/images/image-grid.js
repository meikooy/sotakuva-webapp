import React, {Component} from 'react';


const getImgStyle = img =>
  ({backgroundImage: `url(https://api.rintamalla.fi/images/${img.objectID}/file?size=thumbnail)`});


export default class Images extends Component {
  render() {
    const {images, onImageClick} = this.props;

    return (
      <div className="image-grid">
        {images.map(img =>
          <div
            className="img img-thumb"
            id={img.objectID}
            style={getImgStyle(img)}
            key={img.objectID}
            onClick={_ => onImageClick(img)}>
            <div className="caption">
              <span>{img.caption.length > 90 ? img.caption.substr(0, 90) + '...' : img.caption}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}
