import React from 'react';
import classes from '../CreateProcedureForm.module.scss';

function DurationInput({option}: {option: number}):JSX.Element {
  return <div className={classes.durationInputWrapper}>
      <input defaultValue={Math.floor(option)} name={`procedureDurationHours${option}`} type="number" min={0} max={23} required placeholder="ex: 1" />
      <p>Hours</p>
      <select defaultValue={option % 1 * 60} name={`procedureDurationMinutes${option}`}>
        <option>0</option>
        <option>15</option>
        <option>30</option>
        <option>45</option>
      </select>
      <p>Minutes</p>
    </div>;
}

export default DurationInput;
