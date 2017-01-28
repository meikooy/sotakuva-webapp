import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImagesContainer from '../images/images-container';
import {replace} from '../../modules/navigation/actions';
import {inputChange} from '../../modules/global-search/actions';
import {setVisibilityFilter} from '../../modules/images/actions';
import {createVisibilityFilter} from '../../modules/images/helpers';


class Container extends Component {
  // trigger a search if the component was mounted while
  // there was a search query in the location
  componentDidMount() {
    const {location, triggerSearch} = this.props;
    const {search} = location.query;

    if (search) triggerSearch(search);
  }

  render() {
    return <ImagesContainer {...this.props} disableRedirection />;
  }
}


function mapStateToProps(state) {
  return {};
}


const mapDispatchToProps = (dispatch, props) => {
  return {
    triggerSearch(input) {
      const filter = createVisibilityFilter('search', {search: input, page: 0});
      dispatch(setVisibilityFilter(filter));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container);
