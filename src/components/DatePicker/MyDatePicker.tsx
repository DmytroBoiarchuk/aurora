import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './MyDatePicker.scss';
import usersData from '../../database/usersData';
import MediumButton from "../../UI/M-Button/MediumButton";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {setDate} from "../../store/modules/bookingReducer/reducer";

function MyDatePicker({setIsDatePicked}: React.Dispatch<React.SetStateAction<boolean>>): JSX.Element {
  const { workingDates } = usersData;
  const dispatch = useAppDispatch();
  function calcDisabledDaysIntervals(dates): boolean {
      const availableDates = workingDates.map((date) => new Date(date.day));
      return !availableDates.some(
          (availableDate) =>
              availableDate.getDate() === dates.getDate() &&
              availableDate.getMonth() === dates.getMonth() &&
              availableDate.getFullYear() === dates.getFullYear()
      );
  }
  const [selected, setSelected] = useState<Date>();
  function confirmHandler(e):void {
      e.preventDefault();
      dispatch(setDate(selected?.toISOString()));
      setIsDatePicked(true);
  }
  return (
    <>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        disabled={calcDisabledDaysIntervals}
        startMonth={new Date()}
        fixedWeeks
      />
      <MediumButton disabled={typeof selected === 'undefined'} classNames='confirm-date-button' onClick={confirmHandler} >Confirm Date</MediumButton>
    </>
  );
}

export default MyDatePicker;
