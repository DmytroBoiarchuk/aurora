import React, { useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import classes from './TimePicker.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import usersData from '../../database/usersData';
import TimeSlot from './components/TimeSlot/TimeSlot';
import MediumButton from '../../UI/M-Button/MediumButton';
import SmallButton from '../../UI/S-Button/SmallButton';
import { setTime } from '../../store/modules/bookingReducer/reducer';

function TimePicker({ setIsDatePicked }: React.Dispatch<React.SetStateAction<number>>): JSX.Element {
  const [active, setActive] = useState<number>(0);
  const dispatch = useAppDispatch();
  const bookingData = useAppSelector((state) => state.bookingReducer);
  function findAvailableTime(): number[] {
    const availableTime = usersData.workingDates.find((day) => new Date(day.day).toISOString() === bookingData.date);
    const timesArray: number[] = [];
    if (availableTime)
      for (let i = 0; i < availableTime.timeFrom.length; i++) {
        const windows: number = availableTime.timeTo[i] - availableTime.timeFrom[i];
        for (let j = 0; j < windows; j += 0.5) {
          if (!(availableTime.timeFrom[i] + bookingData.duration + j > availableTime.timeTo[i]))
            timesArray.push(availableTime.timeFrom[i] + j);
        }
      }
    return timesArray;
  }
  function backToCalendarHandler(e): void {
    e.preventDefault();
    setActive(0);
    setIsDatePicked((prevState) => !prevState);
    dispatch(setTime(''));
  }
  return (
    <>
      <span className={classes.backButton}>
        <SmallButton onClick={backToCalendarHandler}>
          <MdArrowBackIosNew />
        </SmallButton>
      </span>
      <div className={classes.timePickerContainer}>
        {findAvailableTime().map((slot) => (
          <TimeSlot key={slot} active={active} setActive={setActive} time={slot} />
        ))}
      </div>
      <MediumButton disabled={active === 0} classNames={classes.formSubmitButton}>
        Submit
      </MediumButton>
    </>
  );
}

export default TimePicker;
