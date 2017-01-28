import React, {Component} from 'react';
import TermsContainer from '../containers/terms-container';
import Page from '../components/layout/page';


export default class TermsPage extends Component {
  render() {
    return (
      <Page modifierClasses="terms" {...this.props}>
        <TermsContainer/>
      </Page>
    );
  }
}
