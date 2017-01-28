import React, {Component} from 'react';


export default class Root extends Component {
  render() {
    return <div className='app'>{this.props.children}</div>;
  }
}
