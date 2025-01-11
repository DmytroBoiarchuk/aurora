import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import classes from './InfoBlock.module.scss';
import ProcedurePlate from '../../../../UI/procedurePlate/ProcedurePlate';
import Block from '../../../../UI/Block/Block';
import Rating from '../Rating/Rating';
import ErrorBlock from "../../../../UI/Error/ErrorBlock";
import { UsersDataInterface } from '../../../../assets/interfaces/interfaces';

function InfoBlock(): JSX.Element {
  const queryClient = useQueryClient();
  const mastersData: UsersDataInterface | undefined = queryClient.getQueryData(['MastersData']);
  const rating = +(mastersData?.reviews.reduce((acc, curValue) => acc + curValue.rate, 0) / mastersData?.reviews.length).toFixed(1);
  return (
    <Block>
      {/*<ErrorBlock error='404' />*/}
      <div className={classes.infoBlock}>
        <div className={classes.imgRatingContainer}>
          <img src={mastersData?.photo || '/no-photo-img.jpg'} alt="Master" />
          <Rating editable={false} rating={rating} size={25} showNumbers />
        </div>

        <div className={classes.description}>
          <h2>{mastersData?.name}</h2>
          <ul>
            {mastersData?.treatments.map((treatment) => (
              <li key={treatment.id}>
                <ProcedurePlate>{treatment.procedureName}</ProcedurePlate>
              </li>
            ))}
          </ul>
          <p>{mastersData?.description}</p>
        </div>
      </div>
    </Block>
  );
}

export default InfoBlock;
