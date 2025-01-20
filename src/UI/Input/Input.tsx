import React from 'react';
import classes from './Input.module.scss';

interface InputProps {
  required: boolean;
  placeholder: string;
  id: string;
  type: string;
  name: string;
}

function Input({ required, placeholder, id, type, name } : InputProps): JSX.Element {
  return (
    <div>
      <div className={classes.inputStyle}>
        <label>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
        <input required={required} placeholder={placeholder} id={id} type={type} name={name} />
      </div>
    </div>
  );
}

export default Input;
