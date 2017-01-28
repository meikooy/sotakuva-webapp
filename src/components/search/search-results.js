import React, {Component, PropTypes} from 'react';
import Icon from '../icon';
import Images from '../images/images';


class SearchResults extends Component {
  render() {
    const {
      searchText,
      fetching,
      searched,
      loadingMore,
      searchResults,
      handleItemClick,
      loadMore
    } = this.props;

    return <Images
      images={searchResults}
      imagesLoaded={!fetching}
      open={handleItemClick}
      loadingMore={loadingMore}
      loadMore={loadMore} />;
  }
}

export default SearchResults;
