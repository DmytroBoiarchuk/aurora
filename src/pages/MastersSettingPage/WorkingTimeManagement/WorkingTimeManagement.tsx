import React, { useState } from 'react';
import MyDatePicker from '../../../components/DatePicker/MyDatePicker';
import Block from '../../../UI/Block/Block';
import CheckBoxes from './components/CheckBoxes/CheckBoxes';

function WorkingTimeManagement(): JSX.Element {
  const [chosenOption, setChosenOption] = useState<string>('custom');
  const [howManyMonthsIsPlaning, setHowManyMonthsIsPlaning] = useState<number>(1);
  return (
    <Block>
      <CheckBoxes setHowManyMonthsIsPlaning={setHowManyMonthsIsPlaning} chosenOption={chosenOption} setChosenOption={setChosenOption}/>
      <MyDatePicker howManyMonthsIsPlaning={howManyMonthsIsPlaning} chosenOption={chosenOption}/>
      Working Time Management
    </Block>
  );
}

export default WorkingTimeManagement;
