import React, {Component} from 'react';


const getImgStyle = img => ({
  background:
  `url("https://api.rintamalla.fi/images/${img.objectID}/file?size=thumbnail") center center / cover no-repeat, `
  + 'url("/images/loader.gif") center center / 80px auto no-repeat'
});


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
            {img.caption
              && img.caption.length > 0
              && <div className="caption">
              <span>{img.caption.length > 90 ? img.caption.substr(0, 90) + '...' : img.caption}</span>
            </div>}
          </div>
        )}
      </div>
    );
  }
}
