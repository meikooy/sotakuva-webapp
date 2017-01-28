import React, {Component} from 'react';
import HomeContainer from '../../containers/mobile-home-container';
import Page from '../../components/layout/page';


export default class MobileHomePage extends Component {
  render() {
    return (
      <Page modifierClasses="faded,home" {...this.props}>
        <HomeContainer />
      </Page>
    );
  }
}
