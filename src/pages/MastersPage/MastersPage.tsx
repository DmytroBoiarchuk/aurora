import React from 'react';
import InfoBlock from './components/InfoBlock/InfoBlock';
import classes from './MastersPage.module.scss';
import ProceduresBlock from './components/ProceduresBlock/ProceduresBlock';
import LocationBlock from './components/LocationBlock/LocationBlock';
import ReviewsBlock from './components/ReviewsBlock/ReviewsBlock';

function MastersPage(): JSX.Element {
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
