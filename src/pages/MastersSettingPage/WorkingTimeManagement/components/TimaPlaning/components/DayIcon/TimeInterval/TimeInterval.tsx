import React, { ChangeEvent, useState } from 'react';
import { TiMinus } from 'react-icons/ti';
import { availableHours, availableMinutes } from '../../../../../../../../assets/constants/constants';
import classes from './TimeInterval.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks/reduxHooks';
import {
  deleteInterval,
  setHoursFrom, setHoursTo,
  setMinutesFrom, setMinutesTo,
} from '../../../../../../../../store/modules/workingScheduleReducer/reducer';
import {
  deleteAllDaysNewInterval,
  setForAllHoursFrom, setForAllHoursTo, setForAllMinutesFrom, setForAllMinutesTo,
} from '../../../../../../../../store/modules/setTimeForAllDaysModalReducer/reducer';

interface TimeIntervalProps {
  from: number;
  to: number;
  indexOfInterval: number;
  workingDay: string;
  isModal?: boolean;
}

function TimeInterval({ from, to, indexOfInterval, workingDay, isModal = false }: TimeIntervalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [timeFrom, setTimeFrom] = useState<{ hours: string; minutes: string }>({
    hours: `${from >= 10 ? Math.floor(from) : `0${Math.floor(from)}`}`,
    minutes: `${(from - Math.floor(from)) * 60}`,
  });
  const [timeTo, setTimeTo] = useState<{ hours: string; minutes: string }>({
    hours: `${to >= 10 ? Math.floor(to) : `0${Math.floor(to)}`}`,
    minutes: `${(to - Math.floor(to)) * 60}`,
  });

  function onDeleteIntervalHandler(): void {
    if(isModal) dispatch(deleteAllDaysNewInterval(indexOfInterval));
    else dispatch(deleteInterval({ day: workingDay, intervalIndex: indexOfInterval }));
  }
  function setTimeHandler(
    setFor: 'hours' | 'minutes',
    fromOrTo: 'from' | 'to',
    e: ChangeEvent<HTMLSelectElement>
  ): void {
    if (setFor === 'hours')
      if (fromOrTo === 'from') {
        setTimeFrom((prevState) => ({
          hours: e.target.value,
          minutes: prevState.minutes,
        }));
        // temporary - later fetch PUT
        if(isModal) dispatch(setForAllHoursFrom({hour: e.target.value, intervalIndex: indexOfInterval}));
        else dispatch(setHoursFrom({intervalIndex: indexOfInterval, day: workingDay, hour: e.target.value}));
        //
      } else {
        setTimeTo((prevState) => ({
          hours: e.target.value,
          minutes: prevState.minutes,
        }));
        // temporary - later fetch PUT
        if(isModal) dispatch(setForAllHoursTo({hour: e.target.value, intervalIndex: indexOfInterval}));
        else dispatch(setHoursTo({intervalIndex: indexOfInterval, day: workingDay, hour: e.target.value}));
        //
      }

    if (setFor === 'minutes')
      if (fromOrTo === 'from') {
        setTimeFrom((prevState: { hours: string; minutes: string }): { hours: string; minutes: string } => ({
          hours: prevState.hours,
          minutes: e.target.value,
        }));
        // temporary - later fetch PUT
        if(isModal) dispatch(setForAllMinutesFrom({minute: e.target.value, intervalIndex: indexOfInterval}));
        else dispatch(setMinutesFrom({intervalIndex: indexOfInterval, day: workingDay, minutes: e.target.value}));
        //
      } else {
        setTimeTo((prevState: { hours: string; minutes: string }): { hours: string; minutes: string } => ({
          hours: prevState.hours,
          minutes: e.target.value,
        }));
        // temporary - later fetch PUT
        if(isModal) dispatch(setForAllMinutesTo({minute: e.target.value, intervalIndex: indexOfInterval}));
        else dispatch(setMinutesTo({intervalIndex: indexOfInterval, day: workingDay, minutes: e.target.value}));

        //
      }
  }

  return (
    <div className={classes.customSelect}>
      <select
        value={timeFrom.hours}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => setTimeHandler('hours', 'from', e)}
      >
        {availableHours.map(
          (hour: string): JSX.Element => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          )
        )}
      </select>
      :
      <select
        value={timeFrom.minutes}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => setTimeHandler('minutes', 'from', e)}
      >
        {availableMinutes.map(
          (min: string): JSX.Element => (
            <option key={min} value={min}>
              {min}
            </option>
          )
        )}
      </select>
      -
      <select
        value={timeTo.hours}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => setTimeHandler('hours', 'to', e)}
      >
        {availableHours.map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      :
      <select
        value={timeTo.minutes}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => setTimeHandler('minutes', 'to', e)}
      >
        {availableMinutes.map(
          (min: string): JSX.Element => (
            <option key={min} value={min}>
              {min}
            </option>
          )
        )}
      </select>
      <button onClick={onDeleteIntervalHandler}>
        <TiMinus size={10} />
      </button>
    </div>
  );
}

export default TimeInterval;
