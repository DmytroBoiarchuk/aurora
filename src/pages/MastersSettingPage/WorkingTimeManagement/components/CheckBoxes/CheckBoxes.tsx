import React from 'react';
import classes from './ChackBoxes.module.scss';

interface CheckBoxesProps {
  chosenOption: string;
  setChosenOption: React.Dispatch<React.SetStateAction<string>>;
  setHowManyMonthsIsPlaning: React.Dispatch<React.SetStateAction<number>>;
}
const maxMonthsPlaning = 12;
function getMonthsOptionsArray ():React.JSX.Element[] {
  const array = [];
  for (let i = 0; i < maxMonthsPlaning; i++) {
    array.push(<option key={i+1} value={i+ 1}>{i+1}</option>);
  }
  return array;
}
function CheckBoxes({ chosenOption, setChosenOption,setHowManyMonthsIsPlaning }: CheckBoxesProps): JSX.Element {
  return (
    <>
     <select onChange={(e):void => setHowManyMonthsIsPlaning(+e.currentTarget.value)}>
       {getMonthsOptionsArray()}
     </select>
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
        <label>
          <input
            defaultChecked
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
