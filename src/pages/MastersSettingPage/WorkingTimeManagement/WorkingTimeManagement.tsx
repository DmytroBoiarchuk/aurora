import React, { useState } from 'react';
import MyDatePicker from '../../../components/DatePicker/MyDatePicker';
import Block from '../../../UI/Block/Block';
import CheckBoxes from './components/CheckBoxes/CheckBoxes';
import TimePlaning from './components/TimaPlaning/TimePlaning';
import classes from './WorkingTimeManagement.module.scss';

function WorkingTimeManagement(): JSX.Element {
  const [chosenOption, setChosenOption] = useState<string>('custom');
  const [howManyMonthsIsPlaning, setHowManyMonthsIsPlaning] = useState<number>(1);
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
        />
        <TimePlaning howManyMonthsIsPlaning={howManyMonthsIsPlaning} />
      </div>
    </Block>
  );
}

export default WorkingTimeManagement;
