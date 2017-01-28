import React from 'react';
import {connect} from 'react-redux';
import Component from '../components/images';
import {goTo} from '../modules/navigation/actions';


function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goTo(path) {
      dispatch(goTo(path));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
