import React, {Component, PropTypes} from 'react';
import Icon from '../icon';


const getImgStyle = img =>
  ({backgroundImage: `url(https://sotakuva-api.herokuapp.com/images/${img.objectID}/file?size=thumbnail)`});


export default class Images extends Component {
  render() {
    const {images, imagesLoaded, open} = this.props;

    return (
      <div>
        {!imagesLoaded && <Icon name="spinner" spin />}
        {!!imagesLoaded &&
          <div className="images-container">
            {Object.values(images).map(img =>
              <div className="img img-thumb" style={getImgStyle(img)} key={img.objectID} onClick={_ => open(img)} />
            )}
          </div>
        }
      </div>
    );
  }
}
