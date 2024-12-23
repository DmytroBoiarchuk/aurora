import React from 'react';
import classes from './SmallButton.module.scss';
import { CustomButtonProps } from '../../assets/interfaces/types';

function SmallButton({children, classNames='', ...props} : CustomButtonProps):JSX.Element {
  return (
    <button className={`${classNames} ${classes.button}`} {...props}>
      {children}
    </button>
  );
}

export default SmallButton;
