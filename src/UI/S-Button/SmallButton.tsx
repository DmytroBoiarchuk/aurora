import React, {ButtonHTMLAttributes} from 'react';
import classes from './SmallButton.module.scss';

function SmallButton({children, classNames='', ...props} : ButtonHTMLAttributes<HTMLButtonElement>):JSX.Element {
  return (
    <button className={`${classNames} ${classes.button}`} {...props}>
      {children}
    </button>
  );
}

export default SmallButton;
