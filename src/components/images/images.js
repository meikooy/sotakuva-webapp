import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Icon from '../icon';
import scrolltop from 'scrolltop';


const triggerOffset = 100;

const getImgStyle = img =>
  ({backgroundImage: `url(https://api.rintamalla.fi/images/${img.objectID}/file?size=thumbnail)`});


export default class Images extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    const list = this.refs.list;

    if (!list) return;

    const h = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    const scrollTop = scrolltop();

    if (scrollTop > (bodyHeight - h - triggerOffset)) {
      if (!this.props.loadingMore) {
        this.props.loadMore();
      }
    }
  }

  render() {
    const {images, imagesLoaded, open} = this.props;

    return (
      <div>
        {!imagesLoaded && <Icon name="spinner" spin />}
        {!!imagesLoaded &&
          <div className="image-grid" ref="list">
            {Object.values(images).map(img =>
              <div
                className="img img-thumb"
                id={img.objectID}
                style={getImgStyle(img)}
                key={img.objectID}
                onClick={_ => open(img)} />
            )}
          </div>
        }
      </div>
    );
  }
}
