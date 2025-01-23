import React from 'react';
import classes from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

function Input({name, ...props } : InputProps): JSX.Element {
  return (
    <div>
      <div className={classes.inputStyle}>
        <label>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
        <input {...props} />
      </div>
    </div>
  );
}

export default Input;
