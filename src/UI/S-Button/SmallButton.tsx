import React from 'react';
import classes from './SmallButton.module.scss';
import { CustomButtonProps } from '../../assets/interfaces/types';

function SmallButton({children, className,disabled, ...props} : CustomButtonProps):JSX.Element {
  return (
    <button disabled={disabled} className={`${className} ${classes.button} ${!disabled? classes.notDisabled: ''}`} {...props}>
      {children}
    </button>
  );
}

export default SmallButton;
