import React, {Component} from 'react';
import HomeContainer from '../containers/home-container';
import Page from '../components/layout/page';


export default class HomePage extends Component {
  render() {
    return (
      <Page modifierClasses="home" {...this.props}>
        <HomeContainer />
      </Page>
    );
  }
}
