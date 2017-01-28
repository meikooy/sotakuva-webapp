import React, {Component} from 'react';
import {connect} from 'react-redux';
import Images from '../../components/images/images';
import {goTo, replace} from '../../modules/navigation/actions';
import {
  getImages,
  areImagesLoaded,
  getMeta,
  areWeLoadingMore
} from '../../modules/images/selectors';
import {open, loadMore, setVisibilityFilter} from '../../modules/images/actions';
import {initialVisibilityFilter} from '../../modules/images/initial-state';

class Container extends Component {

  componentDidMount() {
    this.props.load();
  }

  render() {
    return <Images {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    imagesLoaded: areImagesLoaded(state),
    images: getImages(state),
    meta: getMeta(state),
    loadingMore: areWeLoadingMore(state)
  };
}

const mapDispatchToProps = (dispatch, {location}) => {
  return {
    open(image) {
      dispatch(replace(`/${location.pathname}${location.search}#${image.objectID}`));
      dispatch(open(image.objectID));
    },
    loadMore() {
      dispatch(loadMore());
    },
    load() {
      dispatch(setVisibilityFilter(initialVisibilityFilter));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container);
