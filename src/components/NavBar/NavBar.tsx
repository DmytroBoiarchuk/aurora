import { JSX } from 'react/jsx-runtime';
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import Logo from '../../../public/logo.svg';
import classes from './NavBar.module.scss';
import SmallButton from '../../UI/S-Button/SmallButton';
import SearchInput from '../SearchInput/SearchInput';

function NavBar(): JSX.Element {
  return (
    <div className={classes.navBarContainer}>
      <div className={classes.logoContainer}>
        <Logo width={100} height={100} />
        <h1>AURORA</h1>
      </div>
      <SearchInput />
      <menu className={classes.menuContainer}>
        <SmallButton>
          <CgProfile size={35} />
        </SmallButton>
        <SmallButton>
          <p>Log In</p>
        </SmallButton>
      </menu>
    </div>
  );
}

export default NavBar;
