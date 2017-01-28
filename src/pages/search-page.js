import React, {Component} from 'react';
import SearchResultsContainer from '../containers/search/search-results-container';
import Page from '../components/layout/page';


export default class SearchPage extends Component {
  render() {
    return (
      <Page {...this.props}>
        <SearchResultsContainer {...this.props} />
      </Page>
    );
  }
}
