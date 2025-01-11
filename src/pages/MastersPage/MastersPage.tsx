import React from 'react';
import { useQuery } from '@tanstack/react-query';
import InfoBlock from './components/InfoBlock/InfoBlock';
import classes from './MastersPage.module.scss';
import ProceduresBlock from './components/ProceduresBlock/ProceduresBlock';
import LocationBlock from './components/LocationBlock/LocationBlock';
import ReviewsBlock from './components/ReviewsBlock/ReviewsBlock';
import { fetchJsonData } from '../../assets/functions/functions';
import { UsersDataInterface } from '../../assets/interfaces/interfaces';

function MastersPage(): JSX.Element {
  const { data } = useQuery<UsersDataInterface>({
    queryKey: ['MastersData'], // add masters ID to keys array to cache loaded master
    queryFn: fetchJsonData,
  });
  console.log(data);
  return (
    <div className={classes.pageContainer}>
      <InfoBlock />
      <ProceduresBlock />
      <LocationBlock />
      <ReviewsBlock />
    </div>
  );
}

export default MastersPage;
