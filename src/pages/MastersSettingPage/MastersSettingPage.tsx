import React from 'react';
import InfoBlockEdit from './InfoBlockEdit/InfoBlockEdit';
import ProcedureBlockSetting from './ProceduresBlockSetting/ProcedureBlockSetting';
import classes from './MastersSettingPage.module.scss';
import WorkingTimeManagement from './WorkingTimeManagement/WorkingTimeManagement';
import LocationBlock from '../MastersPage/components/LocationBlock/LocationBlock';
import { useQuery } from '@tanstack/react-query';
import { UsersDataInterface } from '../../assets/interfaces/interfaces';
import { fetchJsonData } from '../../assets/functions/functions';

function MastersSettingPage(): JSX.Element{
  const { data } = useQuery<UsersDataInterface>({
    queryKey: ['MastersData'], // add masters ID to keys array to cache loaded master
    queryFn: fetchJsonData,
  });
  return (
    <div className={classes.page}>
      <InfoBlockEdit />
      <ProcedureBlockSetting />
      <WorkingTimeManagement />
      <LocationBlock />
    </div>
  );
}

export default MastersSettingPage;
