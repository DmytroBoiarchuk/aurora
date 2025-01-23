import React, { useState } from 'react';
import MyDatePicker from '../../../components/DatePicker/MyDatePicker';
import Block from '../../../UI/Block/Block';
import CheckBoxes from './components/CheckBoxes/CheckBoxes';
import TimePlaning from './components/TimaPlaning/TimePlaning';
import classes from './WorkingTimeManagement.module.scss';
import MediumButton from '../../../UI/M-Button/MediumButton';
import { useAppSelector } from '../../../hooks/reduxHooks';

function WorkingTimeManagement(): JSX.Element {
  const [chosenOption, setChosenOption] = useState<string>('custom');
  const [howManyMonthsIsPlaning, setHowManyMonthsIsPlaning] = useState<number>(1);
  const schedule = useAppSelector(state => state.workingScheduleReducer.chosenDays);
  function confirmWorkingTimeHandler(): void {
    // send new schedule to backend
    console.log('new Schedule', schedule);
  }
  return (
    <Block>
      <CheckBoxes
        setHowManyMonthsIsPlaning={setHowManyMonthsIsPlaning}
        chosenOption={chosenOption}
        setChosenOption={setChosenOption}
      />
      <div className={classes.blockStyle}>
        <MyDatePicker
          howManyMonthsIsPlaning={howManyMonthsIsPlaning}
          chosenOption={chosenOption}
          setChosenOption={setChosenOption}
          showButton={false}
        />
        <div className={classes.timePickingBlock}>
          <TimePlaning howManyMonthsIsPlaning={howManyMonthsIsPlaning} />
          <MediumButton className={classes.confirmButton} onClick={confirmWorkingTimeHandler}>Confirm Schedule</MediumButton>
        </div>
      </div>
    </Block>
  );
}

export default WorkingTimeManagement;
