import React from 'react';
import {connect} from 'react-redux';
import Component from '../../components/search/search-input';
import {inputChange, search} from '../../modules/global-search/actions';
import {navigate} from '../../modules/navigation/actions';
import {getSearchText} from '../../modules/global-search/selectors';


function mapStateToProps(state, props) {
  const {location} = props;
  const searchText = getSearchText(state) || location.query.search || '';

  return {
    initialValues: {search: searchText}
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit(attributes) {
      const val = attributes.search;
      dispatch(navigate(`/haku?search=${val}`));
      dispatch(search(val));
    },
    handleChange(val) {
      dispatch(inputChange(val));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Component);
