import React, {Component, PropTypes} from 'react';
import Icon from '../icon';

const getImgUrl = (img, size) =>
  `https://api.rintamalla.fi/images/${img.objectID}/file?size=${size}`;
const getWrapperStyle = img => ({
  backgroundImage: `url(${getImgUrl(img, 'large')})`
});

const isMobile = window && window.innerWidth < 768;

export default class ImageDetail extends Component {
  constructor() {
    super();
    this.state = {loading: true};
  }


  componentWillReceiveProps(nextProps) {
    if (!this.state.loading) return;
    const {image} = nextProps;
    if (!image) return;
    let img = document.createElement('img');
    img.src = getImgUrl(image, isMobile ? 'thumbnail' : 'large');
    img.addEventListener('load', () => {
      this.removeLoader();
    });
  }

  removeLoader() {
    this.setState({loading: false});
  }

  render() {
    const {image} = this.props;

    if (!image) return null;

    return (
      <div className="image-container">
        <div className="image-wrapper" style={isMobile ? {} : getWrapperStyle(image)}>
          {this.state.loading && <Icon name="spinner" spin />}
          {!this.state.loading && isMobile && <img src={getImgUrl(image, 'thumbnail')} />}
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
