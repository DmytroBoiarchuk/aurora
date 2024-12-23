import React from 'react';
import classes from './MediumButton.module.scss';
import { CustomButtonProps } from '../../assets/interfaces/types';

function MediumButton({ children, classNames = '', ...props }: CustomButtonProps): JSX.Element {
  return (
    <button className={`${classNames} ${classes.button}`} {...props}>
      {children}
    </button>
  );
}

export default MediumButton;
