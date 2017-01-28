import React, {Component} from 'react';
import RootContainer from '../containers/root-container';
import NavbarContainer from '../containers/navbar-container';
import NotificationsContainer from '../containers/notifications-container';


export default class RootPage extends Component {
  render() {
    const {location, params} = this.props;

    return (
      <RootContainer>
        <NavbarContainer {...this.props} />
        <NotificationsContainer />
        <div className="view">
          {this.props.children}
        </div>
      </RootContainer>
    );
  }
}
