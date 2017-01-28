import React, {Component} from 'react';
import ImageDetailContainer from '../containers/images/image-detail-container';
import Page from '../components/layout/page';


export default class ImageDetailPage extends Component {
  render() {
    return (
      <Page {...this.props}>
        <ImageDetailContainer {...this.props} />
      </Page>
    );
  }
}
