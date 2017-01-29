import React, {Component, PropTypes} from 'react';
import Icon from '../icon';
import {eras} from '../../modules/images/dict';

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

  componentDidMount() {
    setTimeout(() => {
      document.body.scrollTop = 0;
    }, 200);
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

    const era = eras[image.era];
    const detailsLink = `http://sa-kuva.fi/neo?tem=webneo_image_large&lang=FIN&imgid=${image.sa_id}&docid=7aa7d352216b0553;&ddocid=7aa7d352216b0553&archive=`;
    return (
      <div className="image-container">
        <a href={getImgUrl(image, 'large')} target="_blank" className="image-wrapper" style={isMobile ? {} : getWrapperStyle(image)}>
          {this.state.loading && <Icon name="spinner" spin />}
          {!this.state.loading && isMobile && <img src={getImgUrl(image, 'thumbnail')} />}
        </a>
        <div className="image-details">
          {!!image.caption && <p className="caption">{image.caption}</p>}
          {!!image.description && <p><strong>Lisätietoa</strong><br/>{image.description}</p>}
          <p>
              <strong>Aikakausi</strong><br />
              {era}
          </p>
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
            <a target="blank" href={detailsLink}>{image.source}</a>
          </p>}
        </div>
      </div>
    );
  }
}
