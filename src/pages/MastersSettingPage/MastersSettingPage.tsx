import React from 'react';
import InfoBlockEdit from './InfoBlockEdit/InfoBlockEdit';
import ProcedureBlockSetting from './ProceduresBlockSetting/ProcedureBlockSetting';
import classes from './MastersSettingPage.module.scss';
import WorkingTimeManagement from './WorkingTimeManagement/WorkingTimeManagement';

function MastersSettingPage(): JSX.Element{
  return (
    <div className={classes.page}>
      <InfoBlockEdit />
      <ProcedureBlockSetting />
      <WorkingTimeManagement />
    </div>
  );
}

export default MastersSettingPage;
