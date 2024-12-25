import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './ChackBoxes.module.scss';
import { weekDays } from '../TimaPlaning/TimePlaning';
import SlideDownButton from '../../../../../UI/SlideDownButton/SlideDownButton';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import { setCustomWorkingDaysSchedule } from '../../../../../store/modules/workingScheduleReducer/reducer';

interface CheckBoxesProps {
  chosenOption: string;
  setChosenOption: React.Dispatch<React.SetStateAction<string>>;
  setHowManyMonthsIsPlaning: React.Dispatch<React.SetStateAction<number>>;
}
const maxMonthsPlaning = 12;
function getMonthsOptionsArray(): React.JSX.Element[] {
  const array = [];
  for (let i = 0; i < maxMonthsPlaning; i++) {
    array.push(
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    );
  }
  return array;
}
const listItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.1,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -20,
    transition: {
      delay: (weekDays.length - 1 - i) * 0.02,
      duration: 0.1,
    },
  }),
};
function CheckBoxes({ chosenOption, setChosenOption, setHowManyMonthsIsPlaning }: CheckBoxesProps): JSX.Element {
  const [chosenWeekDays, setChosenWeekDays] = useState<boolean[]>(Array(7).fill(false));
  const [isWeekDaysListDropped, setIsWeekDaysListDropped] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  function changeWeekDaysHandler(index: number): void {
    dispatch(setCustomWorkingDaysSchedule(index));
    setChosenWeekDays((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }
  function toggleDropDown(): void {
    setIsWeekDaysListDropped((prevState) => !prevState);
  }
  return (
    <>
      <div>
        <label>Chose how many months you want to plan: </label>
        <select
          className={classes.selectMonth}
          onChange={(e): void => setHowManyMonthsIsPlaning(+e.currentTarget.value)}
        >
          {getMonthsOptionsArray()}
        </select>
        {' months'}
      </div>
      <label>Choose your working days:</label>
      <div className={classes.checkBoxesContainer}>
        <label>
          <input
            checked={chosenOption === 'everyDay'}
            onChange={(): void => setChosenOption('everyDay')}
            name="everySingleDay"
            type="checkbox"
          />
          Every Day
        </label>
        <label>
          <input
            checked={chosenOption === 'WorkingDays'}
            onChange={(): void => setChosenOption('WorkingDays')}
            name="everyWorkingDay"
            type="checkbox"
          />
          MON-FRI
        </label>
        <label>
          <input
            checked={chosenOption === 'Weekends'}
            onChange={(): void => setChosenOption('Weekends')}
            name="everyWeekend"
            type="checkbox"
          />
          SUT-SAN
        </label>
        <div className={classes.choseWeekDaysStyle}>
          <p>Customize days</p>
          <SlideDownButton
            classNames={classes.slideDownButton}
            isDropped={isWeekDaysListDropped}
            toggleDropdown={toggleDropDown}
          />
          <AnimatePresence>
            {isWeekDaysListDropped && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {weekDays.map((day, index) => (
                  <motion.label
                    initial="hidden"
                    animate="visible"
                    exit='exit'
                    variants={listItemVariants}
                    htmlFor={`checkbox-${index}`}
                    custom={index}
                    key={day}
                  >
                    <input
                      onChange={(): void => changeWeekDaysHandler(index)}
                      type="checkbox"
                      checked={chosenWeekDays[index]}
                      id={`checkbox-${index}`}
                    />
                    {day}
                  </motion.label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <label>
          <input
            checked={chosenOption === 'custom'}
            onChange={(): void => setChosenOption('custom')}
            name="custom"
            type="checkbox"
          />
          Custom
        </label>
      </div>
    </>
  );
}

export default CheckBoxes;
