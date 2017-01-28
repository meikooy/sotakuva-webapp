import React, {Component, Children} from 'react';
import RootContainer from '../../containers/root-container';
import NotificationsContainer from '../../containers/notifications-container';
import MobileNavbarContainer from '../../containers/mobile-navbar-container';
import MobileHeaderContainer from '../../containers/mobile-header-container';

export default class MobileRootPage extends Component {
  render() {
    return (
      <RootContainer className="root-mobile">
        <NotificationsContainer className="notifications-mobile" />
        <MobileHeaderContainer {...this.props} />
        <div className="view view-mobile">
          {this.props.children}
        </div>
        <MobileNavbarContainer {...this.props} />
      </RootContainer>
    );
  }
}
