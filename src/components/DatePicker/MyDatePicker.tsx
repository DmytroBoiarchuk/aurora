import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './MyDatePicker.scss';
import MediumButton from '../../UI/M-Button/MediumButton';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setDate } from '../../store/modules/bookingReducer/reducer';
import { ScheduleInterface, UsersDataInterface } from '../../assets/interfaces/interfaces';
import { setWorkingDays } from '../../store/modules/workingScheduleReducer/reducer';
import { WorkingScheduleReducerInterface } from '../../assets/interfaces/reduxInterfaces';
import { modes } from '../../assets/constants/constants';
import { findAvailableTime } from '../../assets/functions/functions';
import { setPickedDate } from '../../store/modules/bookingsListReducer/reducer';
import { queryClient } from '../../query';

interface MyDatePickerProps {
  setIsDatePicked?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  chosenOption?: string | undefined;
  howManyMonthsIsPlaning?: number | undefined;
  setChosenOption?: React.Dispatch<React.SetStateAction<string>> | undefined;
  showButton?: boolean;
  isBookingsPage?: boolean;
}
function MyDatePicker({
  setIsDatePicked = undefined,
  chosenOption = undefined,
  howManyMonthsIsPlaning = undefined,
  setChosenOption = undefined,
  showButton = true,
  isBookingsPage = false,
}: MyDatePickerProps): JSX.Element {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const workingScheduleState: WorkingScheduleReducerInterface = useAppSelector(
    (state): WorkingScheduleReducerInterface => state.workingScheduleReducer
  );
  const bookingData = useAppSelector((state) => state.bookingReducer);
  const mastersData: UsersDataInterface | undefined = queryClient.getQueryData(['MastersData']);

  const dispatch = useAppDispatch();
  function defineDayPickerMode(): 'multiple' | 'single' {
    if (modes.some((mode) => mode === chosenOption)) {
      return 'multiple';
    }
    return 'single';
  }

  // Array of selected dates
  const [selected, setSelected] = useState<Date[]>(
    chosenOption ? [...workingScheduleState.chosenDays.map((date) => new Date(date.day))] : []
  );

  // if used in bookings - send to redux picked date
  useEffect(() => {
    if (isBookingsPage) {
      const pickedDate = selected.length === 0 ? '' : selected[0].toISOString().split('T')[0];
      dispatch(setPickedDate(pickedDate));
    }
  }, [selected]);
  // set selected date on calendar according to redux store
  useEffect(() => {
    if (chosenOption) {
      setSelected([...workingScheduleState.chosenDays.map((date) => new Date(date.day))]);
    }
  }, [workingScheduleState.chosenDays]);
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
        if (workingScheduleState.customWorkingDaysSchedule[day.getDay()]) dates.push(day);
        d.setDate(d.getDate() + 1);
      }
      if (workingScheduleState.customWorkingDaysSchedule.every((a) => !a)) {
        dispatch(
          setWorkingDays(dates.map((date) => ({ day: date.toISOString().split('T')[0], timeTo: [16], timeFrom: [8] })))
        );
      }
      if (dates.length !== 0) {
        dispatch(
          setWorkingDays(dates.map((date) => ({ day: date.toISOString().split('T')[0], timeTo: [16], timeFrom: [8] })))
        );
      }
    } else setIsFirstRender(false);
  }, [workingScheduleState.customWorkingDaysSchedule]);

  // calc disabled dates intervals
  function calcDisabledDaysIntervals(date: Date): boolean {
    const availableDates = workingScheduleState.chosenDays.map((workingDate) =>
      findAvailableTime(bookingData, date.toISOString().split('T')[0], workingScheduleState.chosenDays).length !== 0
        ? new Date(workingDate.day)
        : undefined
    );
    const comparingDates: undefined | (Date | undefined)[] = isBookingsPage? mastersData?.booked.map(b => new Date(b.date)) : availableDates;
    return !comparingDates?.some(
      (availableDate) =>
        availableDate?.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
    );
  }

  // cals disabled days before today and after chosen range of months ( CHENGE TO TENSTACK REQUEST INSTEAD TAKING FROM REDUX )
  function disableOutdatedDaysIntervals(date: Date): boolean {
    const today = new Date();
    const dateOfLastDay = today.setMonth(today.getMonth() + howManyMonthsIsPlaning!);
    return !isBookingsPage? date.getTime() < new Date().getTime() - 1000 * 60 * 60 * 24 || date.getTime() > dateOfLastDay : true;
  }

  function confirmHandler(): void {
    //  confirm choosing day for booking treatment
    if (!chosenOption && selected) {
      const summerTimeRefactoring = new Date(selected[0].getTime() - selected[0].getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];
      dispatch(setDate(summerTimeRefactoring));
    }
    if (setIsDatePicked) setIsDatePicked(true);
  }

  function onSelectDateHandler(date: Date | Date[] | undefined): void {
    let newSelected: Date[] = [];
    if (date) {
      if (setChosenOption) {
        setChosenOption('custom');
        const newDates: Date[] = Array.isArray(date) ? date : [date];
        newSelected = [...(selected?.filter((p) => p === date) || []), ...newDates];
      } else if (Array.isArray(date)) {
        newSelected = [...date];
      } else if(selected.length !== 0) {
        newSelected = selected[0].getDate() === date.getDate() ? [] : [date];
      } else newSelected = [date];
    }
    setSelected(newSelected);

    //  confirm choosing working days
    if (chosenOption) {
      const newSchedule = newSelected?.map((d): ScheduleInterface => {
        const previouslyAddedDays = workingScheduleState.chosenDays.find(
          (weekDay) => weekDay.day === d.toISOString().split('T')[0]
        );
        return {
          day: new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0],
          timeFrom: previouslyAddedDays?.timeFrom || [8],
          timeTo: previouslyAddedDays?.timeTo || [16],
        };
      });
      if (newSchedule) dispatch(setWorkingDays(newSchedule));
    }
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

      {showButton && (
        <MediumButton
          disabled={typeof selected === 'undefined'}
          type="button"
          classNames="confirm-date-button"
          onClick={confirmHandler}
        >
          Confirm Date
        </MediumButton>
      )}
    </div>
  );
}

export default MyDatePicker;
