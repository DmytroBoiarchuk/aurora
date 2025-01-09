import React, { ChangeEvent, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector } from '../../../../../hooks/reduxHooks';
import classes from './TimePlaning.module.scss';
import DayIcon from './components/DayIcon/DayIcon';
import { ScheduleInterface } from '../../../../../assets/interfaces/interfaces';
import { formatDate } from '../../../../../assets/functions/functions';
import { allMonths, weekDays } from '../../../../../assets/constants/constants';

// calc which month options must be rendered and in which order
function calcCurrentSetOfMonth(monthsPlanning: number): string[] {
  const currentMonth = new Date().getMonth();
  const monthsSet: string[] = [];
  for (let i = 0; i < monthsPlanning; i++) {
    if (allMonths[i + currentMonth]) monthsSet.push(allMonths[i + currentMonth]);
    else monthsSet.push(allMonths[i + currentMonth - allMonths.length]);
  }
  return monthsSet;
}

interface TimePlaningProps {
  howManyMonthsIsPlaning: number;
}

function TimePlaning({ howManyMonthsIsPlaning }: TimePlaningProps): JSX.Element {
  const workingSchedule: ScheduleInterface[] = useAppSelector(
    (state): ScheduleInterface[] => state.workingScheduleReducer.chosenDays
  );
  const months: string[] = calcCurrentSetOfMonth(howManyMonthsIsPlaning + 1);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  return (
    <div>
      <div className={classes.choosingMonth}>
        <label>Show month</label>
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>): void =>
            setSelectedMonth(+e.currentTarget.value)
          }
        >
          {months.map((month) => (
            <option key={month} value={allMonths.indexOf(month)}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.timePlaningBlock}>
        <AnimatePresence>
          {[...workingSchedule]
            .sort((a: ScheduleInterface, b: ScheduleInterface): 1 | -1 => (a.day > b.day ? 1 : -1))
            .filter((a: ScheduleInterface): boolean =>
              selectedMonth !== undefined ? new Date(a.day).getMonth() === selectedMonth : true
            )
            .map(
              (schedule: ScheduleInterface): JSX.Element => (
                <DayIcon key={schedule.day} workingDay={schedule}>
                  {formatDate(schedule.day)}
                  <br />
                  {`(${weekDays[new Date(schedule.day).getDay()]})`}
                </DayIcon>
              )
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TimePlaning;
