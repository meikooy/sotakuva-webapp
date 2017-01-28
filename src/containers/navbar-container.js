import React from 'react';
import {connect} from 'react-redux';
import Component from '../components/layout/navbar';
import {inputChange, search} from '../modules/global-search/actions';
import {getSearchText} from '../modules/global-search/selectors';
import {goTo, navigate} from '../modules/navigation/actions';
import {setVisibilityFilter} from '../modules/images/actions';
import {createVisibilityFilter} from '../modules/images/helpers';
import {getActiveFilter} from '../modules/images/selectors';


function mapStateToProps(state, props) {
  const {location} = props;

  return {
    searchText: getSearchText(state) || location.query.search || '',
    activeFilter: getActiveFilter(state),
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogoClick() {
      dispatch(goTo('root'));
    },
    onSearchInput(val) {
      dispatch(inputChange(val));
    },
    onSearchSubmit(attributes) {
      const val = attributes.search;

      if (val.length) {
        const filter = createVisibilityFilter('search', {search: val, page: 0});
        dispatch(setVisibilityFilter(filter));
        dispatch(navigate(`/haku?search=${attributes.search}`));
      }
    },
    activateEra(params) {
      const filter = createVisibilityFilter('era', params);
      dispatch(setVisibilityFilter(filter));
      dispatch(goTo('images'));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
