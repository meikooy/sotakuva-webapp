import React from 'react';
import {connect} from 'react-redux';
import Component from '../../components/images/image-detail';
import {goTo} from '../../modules/navigation/actions';
import {getActiveData} from '../../modules/images/selectors';


function mapStateToProps(state) {
  return {
    image: getActiveData(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
