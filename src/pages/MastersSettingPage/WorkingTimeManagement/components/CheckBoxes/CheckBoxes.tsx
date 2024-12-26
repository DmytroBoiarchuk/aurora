import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './ChackBoxes.module.scss';
import { weekDays } from '../TimaPlaning/TimePlaning';
import SlideDownButton from '../../../../../UI/SlideDownButton/SlideDownButton';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import { setCustomWorkingDaysSchedule } from '../../../../../store/modules/workingScheduleReducer/reducer';

const maxMonthsPlaning = 12;

// renders options for selection of how many months in advance you want to plan your schedule
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

// animation variants
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

interface CheckBoxesProps {
  chosenOption: string;
  setChosenOption: React.Dispatch<React.SetStateAction<string>>;
  setHowManyMonthsIsPlaning: React.Dispatch<React.SetStateAction<number>>;
}
function CheckBoxes({ chosenOption, setChosenOption, setHowManyMonthsIsPlaning }: CheckBoxesProps): JSX.Element {
  const [chosenWeekDays, setChosenWeekDays] = useState<boolean[]>(Array(7).fill(false));
  const [isWeekDaysListDropped, setIsWeekDaysListDropped] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  function changeWeekDaysHandler(index: number, state: boolean): void {
    setChosenOption('custom');
    dispatch(setCustomWorkingDaysSchedule({i:index, value: state}));
    setChosenWeekDays((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }
  function toggleDropDown(): void {
    setIsWeekDaysListDropped((prevState) => !prevState);
  }
  function setChosenWeekDaysFunction(indexes: number[], word: string): void {
    weekDays.forEach((_, index: number) =>
      dispatch(setCustomWorkingDaysSchedule({ i: index, value: indexes.includes(index) }))
    );
    setChosenOption(word);
    setChosenWeekDays((prevState) => [...prevState].map((_, index) => indexes.includes(index)));
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
            onChange={(): void => setChosenWeekDaysFunction([0, 1, 2, 3, 4, 5, 6], 'everyDay')}
            name="everySingleDay"
            type="checkbox"
          />
          Every Day
        </label>
        <label>
          <input
            checked={chosenOption === 'WorkingDays'}
            onChange={(): void => setChosenWeekDaysFunction([1, 2, 3, 4, 5], 'WorkingDays')}
            name="everyWorkingDay"
            type="checkbox"
          />
          MON-FRI
        </label>
        <label>
          <input
            checked={chosenOption === 'Weekends'}
            onChange={(): void => setChosenWeekDaysFunction([0, 6], 'Weekends')}
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
                    exit="exit"
                    variants={listItemVariants}
                    htmlFor={`checkbox-${index}`}
                    custom={index}
                    key={day}
                  >
                    <input
                      onChange={(): void => changeWeekDaysHandler(index, !chosenWeekDays[index] )}
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
