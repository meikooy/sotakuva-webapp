import React, {Component} from 'react';
import SearchInputContainer from '../../containers/search/search-input-container';
import SearchResultsContainer from '../../containers/search/search-results-container';
import Page from '../../components/layout/page';


export default class MobileSearchPage extends Component {
  render() {
    return (
      <Page {...this.props}>
        <SearchInputContainer {...this.props} enableButton />
        <SearchResultsContainer {...this.props} />
      </Page>
    );
  }
}
