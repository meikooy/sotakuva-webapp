import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageDetail from '../../components/images/image-detail';
import {goTo} from '../../modules/navigation/actions';
import {getActiveData, isActiveLoaded} from '../../modules/images/selectors';
import {fetchDetail} from '../../modules/images/actions';


class Container extends Component {

  componentDidMount() {
    const {params, load} = this.props;
    console.log(this.props.params);
    load();

    window.onkeyup = key => {
      let code = key.keyCode ? key.keyCode : key.which;
      switch (code) {
        case 39:
          console.log('Next');
          break;
        case 37:
          console.log('Prev');
          break;
      }
    };
  }

  render() {
    return <ImageDetail {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    image: getActiveData(state),
    loaded: isActiveLoaded(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    load() {
      dispatch(fetchDetail(ownProps.params.id));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container);
