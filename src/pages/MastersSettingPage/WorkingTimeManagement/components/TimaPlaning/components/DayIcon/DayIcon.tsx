import React, { HTMLAttributes } from 'react';
import { FaPlus } from "react-icons/fa";
import classes from './DayIcon.module.scss';
import { ScheduleInterface } from '../../../../../../../assets/interfaces/interfaces';
import TimeInterval from './TimeInterval/TimeInterval';
import { useAppDispatch } from '../../../../../../../hooks/reduxHooks';
import { addInterval } from '../../../../../../../store/modules/workingScheduleReducer/reducer';
import usersData from '../../../../../../../database/usersData';

interface DayIconProps {
  workingDay: ScheduleInterface;
  workingDayIndex: number;
}

function DayIcon({ children, workingDay, workingDayIndex }: HTMLAttributes<HTMLDivElement> & DayIconProps): JSX.Element {
  const dispatch = useAppDispatch();
  function handleAddInterval(): void {
    dispatch(addInterval({ dayIndex: workingDayIndex }));
    usersData.workingDates[workingDayIndex] = {
      day: usersData.workingDates[workingDayIndex].day,
      timeFrom: [...usersData.workingDates[workingDayIndex].timeFrom, 0],
      timeTo: [...usersData.workingDates[workingDayIndex].timeTo, 0],
    };  }
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
      <button onClick={handleAddInterval} className={classes.addNewIntervalButton}>Add Interval <FaPlus/></button>
    </div>
  );
}

export default DayIcon;
