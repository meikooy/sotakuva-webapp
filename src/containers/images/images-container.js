import React from 'react';
import {connect} from 'react-redux';
import Component from '../../components/images/images';
import {goTo} from '../../modules/navigation/actions';
import {getImages, areImagesLoaded, getMeta} from '../../modules/images/selectors';
import {open} from '../../modules/images/actions';


function mapStateToProps(state) {
  return {
    imagesLoaded: areImagesLoaded(state),
    images: getImages(state),
    meta: getMeta(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    open(image) {
      dispatch(open(image.objectID));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
