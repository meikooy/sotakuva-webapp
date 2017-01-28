import React, {Component, PropTypes} from 'react';
import Icon from '../icon';

const getImgUrl = img =>
  `https://api.rintamalla.fi/images/${img.objectID}/file?size=large`;
const getWrapperStyle = img => ({
  backgroundImage: `url(${getImgUrl(img)})`
});


export default class ImageDetail extends Component {
  constructor() {
    super();
    this.state = {loading: true};
  }

  componentDidMount() {
    const {image} = this.props;
    let img = document.createElement('img');
    img.src = getImgUrl(image);
    img.addEventListener('load', () => {
      this.removeLoader();
    });
  }

  removeLoader() {
    this.setState({loading: false});
  }

  render() {
    const {image} = this.props;
    const url = getImgUrl(image);

    return (
      <div className="image-container">
        <div className="image-wrapper" style={getWrapperStyle(image)}>
          {this.state.loading && <Icon name="spinner" spin />}
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
