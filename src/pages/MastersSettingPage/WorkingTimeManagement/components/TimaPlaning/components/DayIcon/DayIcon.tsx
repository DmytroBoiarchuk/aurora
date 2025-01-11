import React, { HTMLAttributes } from 'react';
import { FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import classes from './DayIcon.module.scss';
import { ScheduleInterface } from '../../../../../../../assets/interfaces/interfaces';
import TimeInterval from './TimeInterval/TimeInterval';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks/reduxHooks';
import { addInterval, setForAll } from '../../../../../../../store/modules/workingScheduleReducer/reducer';
import { addAllDaysNewInterval } from '../../../../../../../store/modules/setTimeForAllDaysModalReducer/reducer';

interface DayIconProps {
  workingDay?: ScheduleInterface;
  isModal?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function DayIcon({
  children,
  workingDay = {
    day: '',
    timeTo: [0],
    timeFrom: [0],
  },
  isModal = false,
  setIsOpen,
}: HTMLAttributes<HTMLDivElement> & DayIconProps): JSX.Element {
  const dispatch = useAppDispatch();
  const workingTimeForAllDays = isModal ? useAppSelector((state) => state.timeForAllDaysReducer) : workingDay;
  function handleAddInterval(): void {
    if (isModal) dispatch(addAllDaysNewInterval());
    dispatch(addInterval({ day: workingDay.day }));
  }
  function confirmForAllDaysHandler(): void {
    dispatch(setForAll({ timeFrom: workingTimeForAllDays.timeFrom, timeTo: workingTimeForAllDays.timeTo }));
    if (setIsOpen) setIsOpen(false);
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      layout
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={classes.dayIcon}
    >
      {children}
      <div className={classes.intervalsWrapper}>
        {workingTimeForAllDays.timeFrom.map((interval: number, index: number) => (
          <TimeInterval
            from={interval}
            to={workingDay.timeTo[index]}
            indexOfInterval={index}
            workingDay={workingDay.day}
            key={interval + index}
            isModal={isModal}
          />
        ))}
      </div>
      <button onClick={handleAddInterval} className={classes.addNewIntervalButton}>
        Add Interval <FaPlus />
      </button>
      {isModal && (
        <button onClick={confirmForAllDaysHandler} className={classes.modalConfirmButton}>
          Confirm
        </button>
      )}
    </motion.div>
  );
}

export default DayIcon;
