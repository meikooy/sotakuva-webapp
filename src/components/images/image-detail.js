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
        <a href={getImgUrl(image, 'large')} target="_blank" className="image-wrapper" style={isMobile ? {} : getWrapperStyle(image)}>
          {this.state.loading && <Icon name="spinner" spin />}
          {!this.state.loading && isMobile && <img src={getImgUrl(image, 'thumbnail')} />}
        </a>
        <div className="image-details">
          {!!image.caption && <p className="caption">{image.caption}</p>}
          {!!image.date &&
            <p>
              <strong>Päiväys:</strong><br />
              {new Date(image.date * 1000).toLocaleString('fi-FI', {day: 'numeric', month: 'numeric', year: 'numeric'})}
            </p>}
          {!!image.author &&
            <p>
              <strong>Kuvaaja:</strong><br />
              {image.author}
            </p>}
          {!!image.palce &&
          <p>
            <strong>Paikka:</strong><br />
            {image.place}
          </p>}
          {!!image.source &&
          <p>
            <strong>Lähde:</strong><br />
            {image.source}
          </p>}
        </div>
      </div>
    );
  }
}
