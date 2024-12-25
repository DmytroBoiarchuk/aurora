import React, { HTMLAttributes } from 'react';
import classes from './DayIcon.module.scss';

function DayIcon({children}  : HTMLAttributes<HTMLDivElement> ): JSX.Element {
  return (
    <div className={ classes.dayIcon }>
      {children}
    </div>
  );
}

export default DayIcon;
