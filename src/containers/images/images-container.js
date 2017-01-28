import React from 'react';
import {connect} from 'react-redux';
import Component from '../../components/images/images';
import {goTo, replace} from '../../modules/navigation/actions';
import {
  getImages,
  areImagesLoaded,
  getMeta,
  areWeLoadingMore
} from '../../modules/images/selectors';
import {open, loadMore} from '../../modules/images/actions';


function mapStateToProps(state) {
  return {
    imagesLoaded: areImagesLoaded(state),
    images: getImages(state),
    meta: getMeta(state),
    loadingMore: areWeLoadingMore(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    open(image) {
      dispatch(replace(`/kuvat#${image.objectID}`));
      dispatch(open(image.objectID));
    },
    loadMore() {
      dispatch(loadMore());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
