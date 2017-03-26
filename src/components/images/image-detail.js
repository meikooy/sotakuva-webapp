import React, {Component, PropTypes} from 'react';
import Icon from '../icon';
import {eras} from '../../modules/images/dict';
import FacebookProvider, {Comments, Share} from 'react-facebook';

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

    const detailsLink = `http://sa-kuva.fi/neo?tem=webneo_image_large&lang=FIN&imgid=${image.sa_id}&docid=7aa7d352216b0553;&ddocid=7aa7d352216b0553&archive=`; // eslint-disable-line
    return (
      <div className="image-container">
        <div className="image-area">
          <a href={getImgUrl(image, 'large')}
             target="_blank"
             className="image-wrapper">
            {this.state.loading && <Icon name="spinner" spin />}
            {!this.state.loading &&  <img className="img-responsive" src={getImgUrl(image, isMobile ? 'thumbnail' : 'large')} />}
          </a>
          <FacebookProvider appID={process.env.FACEBOOK_APP_ID}>
            <Comments href={window.location.href} />
          </FacebookProvider>
        </div>
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

          <p>
            <strong>Jaa</strong><br />
            <FacebookProvider appID={process.env.FACEBOOK_APP_ID}>
              <Share href={window.location.href}>
                <a href="#">Jaa Facebookissa</a>
              </Share>
            </FacebookProvider>
          </p>
        </div>
      </div>
    );
  }
}
