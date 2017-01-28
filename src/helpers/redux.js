import {connect as reduxConnect} from 'react-redux';


export function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
  const wrapDispatch = dispatch => ({dispatch});

  function _mergeProps(stateProps, {dispatch}, ownProps) {
    const dispatchProps = mapDispatchToProps(dispatch, stateProps, ownProps);

    return mergeProps
      ? mergeProps(stateProps, dispatchProps, ownProps)
      : {...ownProps, ...stateProps, ...dispatchProps};
  }

  return function connectComponent(component) {
    return reduxConnect(mapStateToProps, wrapDispatch, _mergeProps)(component);
  };
}
