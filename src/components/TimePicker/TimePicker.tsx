import React, { useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import classes from './TimePicker.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import usersData from '../../database/usersData';
import TimeSlot from './components/TimeSlot/TimeSlot';
import MediumButton from '../../UI/M-Button/MediumButton';
import SmallButton from '../../UI/S-Button/SmallButton';
import { setTime } from '../../store/modules/bookingReducer/reducer';
import { findAvailableTime } from '../../assets/functions/functions';

function TimePicker({
  setIsDatePicked,
}: {
  setIsDatePicked: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [active, setActive] = useState<number>(0);
  const dispatch = useAppDispatch();
  const bookingData = useAppSelector((state) => state.bookingReducer);
  function backToCalendarHandler(): void {
    setActive(0);
    setIsDatePicked((prevState) => !prevState);
    dispatch(setTime(''));
  }
  return (
    <>
      <span className={classes.backButton}>
        <SmallButton type='button' onClick={backToCalendarHandler}>
          <MdArrowBackIosNew />
        </SmallButton>
      </span>
      <div className={classes.timePickerContainer}>
        {findAvailableTime(bookingData, bookingData.date).map((slot) => (
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
