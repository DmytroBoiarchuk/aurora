import React from 'react';
import classes from './InfoBlock.module.scss';
import ProcedurePlate from '../../../../UI/procedurePlate/ProcedurePlate';
import Block from '../../../../UI/Block/Block';
import Rating from '../Rating/Rating';
import usersData from '../../../../database/usersData';
import ErrorBlock from "../../../../UI/Error/ErrorBlock";

const { photo, name, description, treatments, reviews } = usersData;
function InfoBlock(): JSX.Element {
  const rating = reviews.reduce((acc, curValue) => acc + curValue.rate, 0) / reviews.length;
  return (
    <Block>
      {/*<ErrorBlock error='404' />*/}
      <div className={classes.infoBlock}>
        <div className={classes.imgRatingContainer}>
          <img src={photo} alt="Master" />
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
