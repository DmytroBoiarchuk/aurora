import React, { HTMLAttributes } from 'react';
import { FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import classes from './DayIcon.module.scss';
import { ScheduleInterface } from '../../../../../../../assets/interfaces/interfaces';
import TimeInterval from './TimeInterval/TimeInterval';
import { useAppDispatch } from '../../../../../../../hooks/reduxHooks';
import { addInterval } from '../../../../../../../store/modules/workingScheduleReducer/reducer';

interface DayIconProps {
  workingDay: ScheduleInterface;
}

function DayIcon({
  children,
  workingDay,
}: HTMLAttributes<HTMLDivElement> & DayIconProps): JSX.Element {
  const dispatch = useAppDispatch();
  function handleAddInterval(): void {
    dispatch(addInterval({ day: workingDay.day }));
  }

  return (
    <motion.div
      initial={{ opacity: 0,scale: 0.8 }}
      layout
      animate={{ opacity: 1 ,scale: 1}}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={classes.dayIcon}
    >
      {children}
      <div className={classes.intervalsWrapper}>
        {workingDay.timeFrom.map((interval: number, index: number) => (
          <TimeInterval
            from={interval}
            to={workingDay.timeTo[index]}
            indexOfInterval={index}
            workingDay={workingDay.day}
            key={interval+index}
          />
        ))}
      </div>
      <button onClick={handleAddInterval} className={classes.addNewIntervalButton}>
        Add Interval <FaPlus />
      </button>
    </motion.div>
  );
}

export default DayIcon;
