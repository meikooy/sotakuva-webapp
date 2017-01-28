import React, {Component, PropTypes} from 'react';
import Icon from '../icon';
import cn from 'classnames';


const NavLink = ({children, routes, to, icon, title, onSelect, isActive}) => {
  const pred = isActive || (r => r.name === to);
  const active = routes.some(r => pred(r, routes));
  return (
    <td className={cn({active})} onClick={_ => onSelect(to)}>
      <Icon name={icon} />
      <span>{title}</span>
    </td>
  );
};

export default class MobileNavbar extends Component {
  render() {
    const {routes, goTo} = this.props;
    const linkProps = {onSelect: goTo, routes: routes.filter(r => !!r.path)};
    const isHomeActive = (r, rs) => rs.length === 1 && r.path === '/';

    return (
      <footer className="mobile-navbar">
        <table>
          <tbody>
            <tr>
              <NavLink to='root' icon="home" title="Koti" isActive={isHomeActive} {...linkProps} />
              <NavLink to='search' icon="search" title="Haku" {...linkProps} />
            </tr>
          </tbody>
        </table>
      </footer>
    );
  }
}
