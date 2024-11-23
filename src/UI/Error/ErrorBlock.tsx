import React from 'react';
import classes from './ErrorBlock.module.scss';

function ErrorBlock({ error }:{error: string}): JSX.Element {
  return (
    <div className={classes.errorStyle}>
      <div className={classes.errorBlock}>
        <h1>Something went wrong</h1>
        <p>{error}</p>
      </div>
    </div>
  );
}

export default ErrorBlock;
