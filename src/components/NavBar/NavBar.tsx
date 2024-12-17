import { JSX } from 'react/jsx-runtime';
import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { useNavigate, Link } from 'react-router';
import Logo from '../../assets/logo.svg';
import classes from './NavBar.module.scss';
import SmallButton from '../../UI/S-Button/SmallButton';
import SearchInput from '../SearchInput/SearchInput';
//comment
function NavBar(): JSX.Element {
  const navigate = useNavigate();
  function onLogoClickHandler(): void {
    navigate('/');
  }
  return (
    <div className={classes.navBarContainer}>
      <div onClick={onLogoClickHandler} className={classes.logoContainer}>
        <Logo width={100} height={100} />
        <h1>AURORA</h1>
      </div>
      <SearchInput />
      <menu className={classes.menuContainer}>
        <Link to="/setting">
          <SmallButton>
            <CgProfile size={35} />
          </SmallButton>
        </Link>

        <SmallButton>
          <p>Log In</p>
        </SmallButton>
      </menu>
    </div>
  );
}

export default NavBar;
