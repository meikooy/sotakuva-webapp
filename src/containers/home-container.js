import React from 'react';
import {connect} from 'react-redux';
import Component from '../components/home';
import {goTo} from '../modules/navigation/actions';
import {setVisibilityFilter} from '../modules/images/actions';
import {createVisibilityFilter} from '../modules/images/helpers';

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goTo(path) {
      dispatch(goTo(path));
    },
    activateEra(params) {
      const filter = createVisibilityFilter('era', params);
      dispatch(setVisibilityFilter(filter));
      dispatch(goTo('images'));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
