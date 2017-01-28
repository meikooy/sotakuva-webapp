import React, {Component} from 'react';
import {connect} from 'react-redux';
import Images from '../../components/images/images';
import {goTo, replace, redirectTo} from '../../modules/navigation/actions';
import {
  getImages,
  areImagesLoaded,
  getMeta,
  getActiveFilter,
  areWeLoadingMore
} from '../../modules/images/selectors';
import {open, loadMore, setVisibilityFilter} from '../../modules/images/actions';
import {initialVisibilityFilter} from '../../modules/images/initial-state';

class Container extends Component {

  componentDidMount() {
    if (!this.props.visibilityFilter && !this.props.disableRedirection) {
      this.props.redirectToRoot();
    }
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
    loadingMore: areWeLoadingMore(state),
    visibilityFilter: getActiveFilter(state)
  };
}

const mapDispatchToProps = (dispatch, {location}) => {
  return {
    open(image) {
      dispatch(replace(`${location.pathname}${location.search}#${image.objectID}`));
      dispatch(open(image.objectID));
    },
    loadMore() {
      dispatch(loadMore());
    },
    redirectToRoot() {
      dispatch(redirectTo('root'));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container);
