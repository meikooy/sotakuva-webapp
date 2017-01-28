import React from 'react';
import {connect} from 'react-redux';
import Notifications from '../components/layout/notifications';
import {getNotifications} from '../modules/notifications/selectors';
import {removeNotification} from '../modules/notifications/actions';


function mapStateToProps(state, ownProps) {
  return {
    notifications: getNotifications(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    remove(id) {
      dispatch(removeNotification(id));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
