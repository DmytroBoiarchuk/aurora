import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './MyDatePicker.scss';
import usersData from '../../database/usersData';
import MediumButton from '../../UI/M-Button/MediumButton';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setDate } from '../../store/modules/bookingReducer/reducer';
import { ScheduleInterface } from '../../assets/interfaces/interfaces';
import { setWorkingDays } from '../../store/modules/workingScheduleReducer/reducer';
import { StateInterface, WorkingScheduleReducerInterface } from '../../assets/interfaces/reduxInterfaces';
import { modes } from '../../assets/constants/constants';
import { findAvailableTime } from '../../assets/functions/functions';

function MyDatePicker({
  setIsDatePicked = undefined,
  chosenOption = undefined,
  howManyMonthsIsPlaning = undefined,
  setChosenOption = undefined,
}: {
  setIsDatePicked?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  chosenOption?: string | undefined;
  howManyMonthsIsPlaning?: number | undefined;
  setChosenOption?: React.Dispatch<React.SetStateAction<string>> | undefined;
}): JSX.Element {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const customWeekDays = useAppSelector(
    (state: StateInterface): WorkingScheduleReducerInterface => state.workingScheduleReducer
  ).customWorkingDaysSchedule;
  const bookingData = useAppSelector((state) => state.bookingReducer);

  const dispatch = useAppDispatch();
  function defineDayPickerMode(): 'multiple' | 'single' {
    if (modes.some((mode) => mode === chosenOption)) {
      return 'multiple';
    }
    return 'single';
  }

  // Array of selected dates
  const [selected, setSelected] = useState<Date[] | undefined>(
    chosenOption ? [...usersData.workingDates.map((date) => new Date(date.day))] : undefined
  );

  // prefilled working days
  useEffect(() => {
    if (howManyMonthsIsPlaning && !isFirstRender) {
      const from = new Date();
      const to = new Date();
      const dates: Date[] = [];
      to.setMonth(to.getMonth() + howManyMonthsIsPlaning);
      const d = from;
      while (d.getTime() <= to.getTime()) {
        const day = new Date(d);
        if (customWeekDays[day.getDay()]) dates.push(day);
        d.setDate(d.getDate() + 1);
      }
      if (customWeekDays.every((a) => !a)) setSelected(dates);
      if (dates.length !== 0) setSelected(dates);
    } else setIsFirstRender(false);
  }, [howManyMonthsIsPlaning, customWeekDays]);

  // calc disabled dates intervals
  function calcDisabledDaysIntervals(date: Date): boolean {
    const availableDates = usersData.workingDates.map((workingDate) =>
      findAvailableTime(bookingData, date.toISOString().split('T')[0]).length !== 0
        ? new Date(workingDate.day)
        : undefined
    );
    return !availableDates.some(
      (availableDate) =>
        availableDate?.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
    );
  }

  // cals disabled days before today and after chosen range of months
  function disableOutdatedDaysIntervals(date: Date): boolean {
    const today = new Date();
    const dateOfLastDay = today.setMonth(today.getMonth() + howManyMonthsIsPlaning!);
    return date.getTime() < new Date().getTime() || date.getTime() > dateOfLastDay;
  }

  function confirmHandler(): void {
    //  confirm choosing day for booking treatment
    if (!chosenOption && selected) {
      const summerTimeRefactoring = new Date(selected[0].getTime() - selected[0].getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];
      dispatch(setDate(summerTimeRefactoring));

      //  confirm choosing working days
    } else {
      const newSchedule = selected?.map(
        (date): ScheduleInterface => ({
          day: new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0],
          timeFrom: [0],
          timeTo: [0],
        })
      );
      if (newSchedule) dispatch(setWorkingDays(newSchedule));

      // fetch PUT instead
      usersData.workingDates = newSchedule!;
    }
    if (setIsDatePicked) setIsDatePicked(true);
  }

  function onSelectDateHandler(date: Date | Date[] | undefined): void {
    if (date)
      if (setChosenOption) {
        setChosenOption('custom');
        let newDates: Date[] = [];
        if (Array.isArray(date)) {
          newDates = date;
        } else if (date) {
          newDates = [date];
        }
        setSelected((prevState) => [...(prevState?.filter((p) => p === date) || []), ...newDates]);
      } else if (Array.isArray(date)) setSelected([...date]);
      else setSelected([date]);
  }

  return (
    <div>
      <DayPicker
        mode={defineDayPickerMode() as typeof chosenOption extends undefined ? 'single' : 'multiple'}
        selected={selected}
        onSelect={onSelectDateHandler}
        disabled={!chosenOption ? calcDisabledDaysIntervals : disableOutdatedDaysIntervals}
        startMonth={new Date()}
        min={1}
        max={chosenOption ? Infinity : undefined}
        fixedWeeks
        required
        weekStartsOn={1}
      />
      <MediumButton
        disabled={typeof selected === 'undefined'}
        type="button"
        classNames="confirm-date-button"
        onClick={confirmHandler}
      >
        Confirm Date
      </MediumButton>
    </div>
  );
}

export default MyDatePicker;
