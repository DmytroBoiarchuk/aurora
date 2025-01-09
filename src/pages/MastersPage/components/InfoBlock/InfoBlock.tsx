import React from 'react';
import classes from './InfoBlock.module.scss';
import ProcedurePlate from '../../../../UI/procedurePlate/ProcedurePlate';
import Block from '../../../../UI/Block/Block';
import Rating from '../Rating/Rating';
import ErrorBlock from "../../../../UI/Error/ErrorBlock";
import { useAppSelector } from '../../../../hooks/reduxHooks';

function InfoBlock(): JSX.Element {
  const treatments = useAppSelector(state => state.treatmentsReducer.treatments);
  const {photo, name, description} = useAppSelector(state => state.userDataReducer);
 const reviews = useAppSelector(state => state.reviewsReducer.reviews);
  const rating = +(reviews.reduce((acc, curValue) => acc + curValue.rate, 0) / reviews.length).toFixed(1);
  return (
    <Block>
      {/*<ErrorBlock error='404' />*/}
      <div className={classes.infoBlock}>
        <div className={classes.imgRatingContainer}>
          <img src={photo || '/no-photo-img.jpg'} alt="Master" />
          <Rating editable={false} rating={rating} size={25} showNumbers />
        </div>

        <div className={classes.description}>
          <h2>{name}</h2>
          <ul>
            {treatments.map((treatment) => (
              <li key={treatment.id}>
                <ProcedurePlate>{treatment.procedureName}</ProcedurePlate>
              </li>
            ))}
          </ul>
          <p>{description}</p>
        </div>
      </div>
    </Block>
  );
}

export default InfoBlock;
