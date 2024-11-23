import React, { ButtonHTMLAttributes } from 'react';
import classes from './MediumButton.module.scss';

function MediumButton({ children, classNames = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button className={`${classNames} ${classes.button}`} {...props}>
      {children}
    </button>
  );
}

export default MediumButton;
