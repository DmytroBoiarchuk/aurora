import React from 'react';
import classes from './MediumButton.module.scss';
import { CustomButtonProps } from '../../assets/interfaces/types';

function MediumButton({ children, className, ...props }: CustomButtonProps): JSX.Element {
  return (
    <button className={`${classes.button} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default MediumButton;
