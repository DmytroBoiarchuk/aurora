import React, { HTMLAttributes } from 'react';
import classes from './DayIcon.module.scss';
import { ScheduleInterface } from '../../../../../../../assets/interfaces/interfaces';
import TimeInterval from './TimeInterval/TimeInterval';

interface DayIconProps {
  workingDay: ScheduleInterface;
  workingDayIndex: number;
}

function DayIcon({ children, workingDay, workingDayIndex }: HTMLAttributes<HTMLDivElement> & DayIconProps): JSX.Element {
  return (
    <div className={classes.dayIcon}>
      {children}
      <div className={classes.intervalsWrapper}>
        {workingDay.timeFrom.map((interval: number, index: number) => (
          <TimeInterval
            key={interval}
            from={interval}
            to={workingDay.timeTo[index]}
            indexOfInterval={index}
            workingDayIndex={workingDayIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default DayIcon;
