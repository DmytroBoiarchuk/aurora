import React from 'react';
import classes from './TimeSlot.module.scss';
import MediumButton from '../../../../UI/M-Button/MediumButton';
import {formatTime} from "../../../../assets/functions/functions";
import {useAppDispatch} from "../../../../hooks/reduxHooks";
import {setTime} from "../../../../store/modules/bookingReducer/reducer";

function TimeSlot({ time, active, setActive }: { time: number, active:number, setActive:React.Dispatch<React.SetStateAction<number>> }): JSX.Element {
  const dispatch = useAppDispatch();
  function onClickHandler(e): void {
    e.preventDefault();
    dispatch(setTime(time));
    setActive(time);
  }

  return (
    <MediumButton onClick={onClickHandler} classNames={`${classes.timeButton} ${active === time ? classes.active : ''}`}>
      {formatTime(time)}
    </MediumButton>
  );
}

export default TimeSlot;
