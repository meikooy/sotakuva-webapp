import React, {Component, PropTypes} from 'react';
import Icon from '../icon';
import scrolltop from 'scrolltop';
import ImageGrid from './image-grid';


const triggerOffset = 100;

const getImgStyle = img => ({
  background:
     `url("https://api.rintamalla.fi/images/${img.objectID}/file?size=thumbnail") center center / cover no-repeat, `
    + 'url("/images/loader.gif") center center / 80px auto no-repeat'
});


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
        {!!imagesLoaded && <ImageGrid ref="list" images={Object.values(images)} onImageClick={open} />}
      </div>
    );
  }
}
