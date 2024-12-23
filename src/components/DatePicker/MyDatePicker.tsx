import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './MyDatePicker.scss';
import usersData from '../../database/usersData';
import MediumButton from '../../UI/M-Button/MediumButton';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setDate } from '../../store/modules/bookingReducer/reducer';
import { ScheduleInterface } from '../../assets/interfaces/interfaces';

const modes = ['everyDay', 'WorkingDays', 'Weekends', 'custom'];
function MyDatePicker({
  setIsDatePicked = undefined,
  chosenOption = undefined,
  howManyMonthsIsPlaning = undefined,
}: {
  setIsDatePicked?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  chosenOption?: string | undefined;
  howManyMonthsIsPlaning?: number | undefined;
}): JSX.Element {
  const { workingDates } = usersData;
  const dispatch = useAppDispatch();
  function defineDayPickerMode(): 'multiple' | 'single' {
    if (modes.some((mode) => mode === chosenOption)) {
      return 'multiple';
    }
    return 'single';
  }
  const [selected, setSelected] = useState<
    typeof chosenOption extends undefined ? Date | undefined : Date[] | undefined
  >(chosenOption ? [] : undefined);

  // prefilled working days
  useEffect(() => {
    if (howManyMonthsIsPlaning) {
      const from = new Date();
      const to = new Date();
      const dates: Date[] = [];
      to.setMonth(to.getMonth() + howManyMonthsIsPlaning);
      const d = from;
      // every day working checkbox
      if (chosenOption === 'everyDay') {
        while (d.getTime() <= to.getTime()) {
          dates.push(new Date(d));
          d.setDate(d.getDate() + 1);
        }
      }
      // mon - fri working days checkbox
      if (chosenOption === 'WorkingDays') {
        while (d.getTime() <= to.getTime()) {
          const day = new Date(d);
          if (day.getDay() >= 0 && day.getDay() < 5) dates.push(day);
          d.setDate(d.getDate() + 1);
        }
      }
      // sut - sun working days checkbox
      if (chosenOption === 'Weekends') {
        while (d.getTime() <= to.getTime()) {
          const day = new Date(d);
          if (day.getDay() > 4) dates.push(day);
          d.setDate(d.getDate() + 1);
        }
      }
      setSelected(dates);
    }
  }, [chosenOption, howManyMonthsIsPlaning]);

  // calc disabled dates intervals
  function calcDisabledDaysIntervals(date: Date): boolean {
    const availableDates = workingDates.map((workingDate) => new Date(workingDate.day));
    return !availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
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
    // confirm choosing working days
    if (!chosenOption) {
      const summerTimeRefactoring = new Date(
        (selected as unknown as Date).getTime() - (selected as unknown as Date).getTimezoneOffset() * 60000
      )
        .toISOString()
        .split('T')[0];
      dispatch(setDate(summerTimeRefactoring));

      //  confirm choosing day for booking treatment
    } else {
      const newSchedule = selected?.map(
        (date): ScheduleInterface => ({
          day: new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0],
          timeFrom: [14, 15.5],
          timeTo: [15, 22],
        })
      );
      usersData.workingDates = newSchedule!;
    }
    if (setIsDatePicked) setIsDatePicked(true);
  }
  return (
    <>
      <DayPicker
        mode={defineDayPickerMode() as typeof chosenOption extends undefined ? 'single' : 'multiple'}
        selected={selected}
        onSelect={setSelected}
        disabled={!chosenOption ? calcDisabledDaysIntervals : disableOutdatedDaysIntervals}
        startMonth={new Date()}
        min={1}
        max={chosenOption ? Infinity : undefined}
        fixedWeeks
        required
      />
      <MediumButton
        disabled={typeof selected === 'undefined'}
        type="button"
        classNames="confirm-date-button"
        onClick={confirmHandler}
      >
        Confirm Date
      </MediumButton>
    </>
  );
}

export default MyDatePicker;
