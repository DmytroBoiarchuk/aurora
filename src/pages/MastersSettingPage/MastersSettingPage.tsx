import React from 'react';
import InfoBlockEdit from './InfoBlockEdit/InfoBlockEdit';
import ProcedureBlockSetting from './ProceduresBlockSetting/ProcedureBlockSetting';
import classes from './MastersSettingPage.module.scss';

function MastersSettingPage(): JSX.Element{
  return (
    <div className={classes.page}>
      <InfoBlockEdit />
      <ProcedureBlockSetting />
    </div>
  );
}

export default MastersSettingPage;
