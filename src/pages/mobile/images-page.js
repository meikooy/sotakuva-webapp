import React, {Component} from 'react';
import ImagesContainer from '../../containers/images/images-container';
import Page from '../../components/layout/page';


export default class ImagesPage extends Component {
  render() {
    return (
      <Page {...this.props}>
        <ImagesContainer />
      </Page>
    );
  }
}
