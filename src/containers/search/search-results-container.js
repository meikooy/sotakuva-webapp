import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchResults from '../../components/search/search-results';
import {search, inputChange} from '../../modules/global-search/actions';
import {open} from '../../modules/images/actions';
import {getSearchText, getSearchResults, isFetching} from '../../modules/global-search/selectors';


class Container extends Component {
  // trigger a search if the component was mounted while
  // there was a search query in the location
  componentDidMount() {
    const {location, triggerSearch} = this.props;
    const {search} = location.query;

    if (search) triggerSearch(search);
  }

  render() {
    return <SearchResults {...this.props} />;
  }
}


function mapStateToProps(state) {
  return {
    fetching: isFetching(state),
    searchText: getSearchText(state),
    searchResults: getSearchResults(state)
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    triggerSearch(input) {
      dispatch(inputChange(input));
    },
    handleItemClick(item) {
      dispatch(open(item.id));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container);
