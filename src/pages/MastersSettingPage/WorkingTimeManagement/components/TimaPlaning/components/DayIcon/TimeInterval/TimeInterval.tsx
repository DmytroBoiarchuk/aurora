import React, { ChangeEvent, useState } from 'react';
import { TiMinus } from 'react-icons/ti';
import { availableHours, availableMinutes } from '../../../../../../../../assets/constants/constants';
import classes from './TimeInterval.module.scss';
import usersData from '../../../../../../../../database/usersData';
import { useAppDispatch } from '../../../../../../../../hooks/reduxHooks';
import { deleteInterval } from '../../../../../../../../store/modules/workingScheduleReducer/reducer';

interface TimeIntervalProps {
  from: number;
  to: number;
  indexOfInterval: number;
  workingDayIndex: number;
}

function TimeInterval({ from, to, indexOfInterval, workingDayIndex }: TimeIntervalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [timeFrom, setTimeFrom] = useState<{ hours: string; minutes: string }>({
    hours: `${from > 10 ? Math.floor(from) : `0${Math.floor(from)}`}`,
    minutes: `${(from - Math.floor(from)) * 60}`,
  });
  const [timeTo, setTimeTo] = useState<{ hours: string; minutes: string }>({
    hours: `${to > 10 ? Math.floor(to) : `0${Math.floor(to)}`}`,
    minutes: `${(to - Math.floor(to)) * 60}`,
  });

  function onDeleteIntervalHandler(): void {
    dispatch(deleteInterval({ dayIndex: workingDayIndex, intervalIndex: indexOfInterval }));
    usersData.workingDates[workingDayIndex] = {
      day: usersData.workingDates[workingDayIndex].day,
      timeFrom: usersData.workingDates[workingDayIndex].timeFrom.filter((_, index) => index !== workingDayIndex),
      timeTo: usersData.workingDates[workingDayIndex].timeTo.filter((_, index) => index !== workingDayIndex),
    };
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
        usersData.workingDates[workingDayIndex] = {
          day: usersData.workingDates[workingDayIndex].day,
          timeFrom: usersData.workingDates[workingDayIndex].timeFrom.with(
            indexOfInterval,
            +e.target.value + +timeFrom.minutes / 60
          ),
          timeTo: usersData.workingDates[workingDayIndex].timeTo,
        };
        //
      } else {
        setTimeTo((prevState) => ({
          hours: e.target.value,
          minutes: prevState.minutes,
        }));
        // temporary - later fetch PUT
        usersData.workingDates[workingDayIndex] = {
          day: usersData.workingDates[workingDayIndex].day,
          timeFrom: usersData.workingDates[workingDayIndex].timeFrom,
          timeTo: usersData.workingDates[workingDayIndex].timeTo.with(
            indexOfInterval,
            +e.target.value + +timeFrom.minutes / 60
          ),
        };
        //
      }

    if (setFor === 'minutes')
      if (fromOrTo === 'from') {
        setTimeFrom((prevState: { hours: string; minutes: string }): { hours: string; minutes: string } => ({
          hours: prevState.hours,
          minutes: e.target.value,
        }));
        // temporary - later fetch PUT
        usersData.workingDates[workingDayIndex] = {
          day: usersData.workingDates[workingDayIndex].day,
          timeFrom: usersData.workingDates[workingDayIndex].timeFrom.with(
            indexOfInterval,
            +e.target.value + +timeFrom.minutes / 60
          ),
          timeTo: usersData.workingDates[workingDayIndex].timeTo,
        };
        //
      } else {
        setTimeTo((prevState: { hours: string; minutes: string }): { hours: string; minutes: string } => ({
          hours: prevState.hours,
          minutes: e.target.value,
        }));
        // temporary - later fetch PUT
        usersData.workingDates[workingDayIndex] = {
          day: usersData.workingDates[workingDayIndex].day,
          timeFrom: usersData.workingDates[workingDayIndex].timeFrom,
          timeTo: usersData.workingDates[workingDayIndex].timeTo.with(
            indexOfInterval,
            +e.target.value + +timeFrom.minutes / 60
          ),
        };
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
