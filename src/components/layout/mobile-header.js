import React, {Component, PropTypes} from 'react';
import Icon from '../icon';
import Button from 'react-bootstrap/lib/Button';


export default class MobileHeader extends Component {
  render() {
    const {parentRoute, title, goTo, goUp} = this.props;

    return (
      <header className="mobile-header">
        {parentRoute &&
          <Button className="back-btn" bsStyle="link" onClick={() => goUp()}>
            <Icon name="caret-left" />
          </Button>}
        {title && <span className="title">{title}</span>}
        <a className="logo" onClick={() => goTo('root')}>
          <img src="/images/logo.svg" />
        </a>
      </header>
    );
  }
}
