import React from 'react';
import {connect} from '../helpers/redux';
import Component from '../components/layout/mobile-header';
import {goTo} from '../modules/navigation/actions';


function mapStateToProps(state, props) {
  // the last one may be an indexRoute
  const routes = props.routes.filter(r => !!r.path);
  const parentRoute = routes.slice(1, routes.length - 1).map(r => r.name).join('__');
  const currentRoute = routes.pop();

  return {
    parentRoute,
    title: currentRoute.title || null
  };
}

const mapDispatchToProps = (dispatch, stateProps, props) => {
  return {
    goTo(path) {
      dispatch(goTo(path));
    },
    goUp() {
      const {params} = props;
      if (stateProps.parentRoute) {
        dispatch(goTo(stateProps.parentRoute, params));
      } else {
        dispatch(goTo('root'));
      }
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
