import React from 'react';
import classes from './SearchInput.module.scss';

function SearchInput({className,...props}:  React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
      <input type="search" className={`${classes.input} ${className || ''}`} {...props} />
  );
}

export default SearchInput;
