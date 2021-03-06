import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Navbar from 'react-bootstrap/lib/Navbar';
import SearchInput from '../search/search-input';
import Icon from '../icon';
import cn from 'classnames';
import {eras} from '../../modules/images/dict';
import scrolltop from 'scrolltop';


const EraFilter = ({title, era, activeFilter, onClick}) => {
  const active = !!activeFilter && activeFilter.name === 'era' && activeFilter.params.era === era;

  return (
    <li>
        <a className={cn({active})} onClick={_ => onClick({era, title})}>{title}</a>
    </li>
  );
};


export default class MainNavbar extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll.bind(this));
    this.navEl = findDOMNode(this.refs.navbar);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    const scrollTop = scrolltop();

    if (scrollTop > 50) {
      this.navEl.classList.add('active');
    } else {
      this.navEl.classList.remove('active');
    }
  }

  render() {
    const {
      searchText,
      activeFilter,
      onLogoClick,
      onSearchSubmit,
      onSearchInput,
      activateEra,
      showNavigation,
    } = this.props;

    const linkProps = {activeFilter, onClick: activateEra};

    return (
      <Navbar id="navbar" ref="navbar" fluid>

        <ul className={cn({'nav': true, 'navbar-nav': true, 'hidden-xs': true, 'opaque': !showNavigation})}>
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

        <div className="mobile-nav-container hidden-sm hidden-md hidden-lg">
          <ul className="nav navbar-nav">
            {Object.keys(eras).map(n => Number(n)).map(n =>
              <EraFilter key={n} title={eras[n]} era={n} {...linkProps} />
            )}
          </ul>

          <div className="navbar-right hidden-xs hidden-sm hidden-md hidden-lg">

            <Navbar.Form pullLeft>
              <SearchInput
                onSubmit={onSearchSubmit}
                initialValues={{search: searchText}} />
            </Navbar.Form>

          </div>
        </div>

        <div className="navbar-right">

          <Navbar.Form pullLeft>
            <SearchInput
              onSubmit={onSearchSubmit}
              onChange={onSearchInput}
              initialValues={{search: searchText}} />
          </Navbar.Form>

        </div>

      </Navbar>
    );
  }
}
