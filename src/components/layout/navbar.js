import React, {Component} from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import SearchInput from '../search/search-input';
import Icon from '../icon';
import cn from 'classnames';
import {eras} from '../../modules/images/dict';


const EraFilter = ({title, era, activeFilter, onClick}) => {
  const active = !!activeFilter && activeFilter.name === 'era' && activeFilter.params.era === era;

  return (
    <li>
        <a className={cn({active})} onClick={_ => onClick({era, title})}>{title}</a>
    </li>
  );
};


export default class MainNavbar extends Component {
  render() {
    const {
      searchText,
      activeFilter,
      onLogoClick,
      onSearchSubmit,
      activateEra
    } = this.props;

    const linkProps = {activeFilter, onClick: activateEra};

    return (
      <Navbar id="navbar" fluid>

        <ul className="nav navbar-nav">
          {Object.keys(eras).map(n => Number(n)).map(n =>
            <EraFilter key={n} title={eras[n]} era={n} {...linkProps} />
          )}
        </ul>

        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={() => onLogoClick()}>
              <img src="/images/logo.svg" />
            </a>
          </Navbar.Brand>
        </Navbar.Header>

        <div className="navbar-right">

          <Navbar.Form pullLeft>
            <SearchInput
              onSubmit={onSearchSubmit}
              initialValues={{search: searchText}} />
          </Navbar.Form>

        </div>

      </Navbar>
    );
  }
}
