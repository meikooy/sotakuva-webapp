import React, {Component} from 'react';
import {Alert, Button} from 'react-bootstrap';
import cn from 'classnames';


const toBsStyle = type => type === 'loading' ? 'info' : type;


export default class Notifications extends Component {
  render() {
    const {notifications, remove, className = '', ...rest} = this.props;

    return (
      <div id="notifications" className={cn('notifications', className)} {...rest}>
        {notifications.map(n =>
          <Alert
              key={n.id}
              bsStyle={toBsStyle(n.type)}
              onClick={_ => remove(n.id)}
              onDismiss={() => {}}
              className={cn('notification', `notification-${n.id}`, n.type)}>
            {n.type === 'loading' && <i className='fa fa-spinner fa-spin' />}
            {' ' + n.message}
          </Alert>
        )}
      </div>
    );
  }
}
