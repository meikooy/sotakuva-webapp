import React, {Component} from 'react';
import cn from 'classnames';


export default class Icon extends Component {
  render() {
    const {name, className, size = null, fw = false, spin = false, color = null, ...rest} = this.props;
    const classname = cn(
      'fa',
      `fa-${name}`,
      fw ? 'fa-fw' : null,
      spin ? 'fa-spin' : null,
      size ? `fa-${size}` : null,
      color ? `text-${color}` : null,
      className
    );

    return <i className={classname} {...rest} />;
  }
}
