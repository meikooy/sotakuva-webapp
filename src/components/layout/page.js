import React, {Component} from 'react';
import cn from 'classnames';


export default class Page extends Component {
  render() {
    const {className = '', modifierClasses = '', routes, children, ...rest} = this.props;
    const {router, location, params, route, routeParams, ...knownProps} = rest;
    const pageName = routes.filter(r => !!r.name).map(r => r.name).join('-');

    const classname = cn(
      'page',
      'container-fluid',
      className,
      modifierClasses.split(',').filter(c => !!c).concat(pageName).map(c => `page-${c}`)
    );

    return (
      <div className={classname} {...knownProps}>
        <div className="page-wrapper">
          {children}
        </div>
      </div>
    );
  }
}
