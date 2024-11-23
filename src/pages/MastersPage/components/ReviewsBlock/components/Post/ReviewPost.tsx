import React from 'react';
import { format } from 'date-fns';
import { ReviewProps } from '../../../../../../assets/interfaces/interfaces';
import classes from './ReviewPost.module.scss';
import Rating from '../../../Rating/Rating';
import { PiSealCheckBold } from 'react-icons/pi';

function ReviewPost({ reviewData: { name, comment, rate, photo, date, isVerified } }: { reviewData: ReviewProps }): JSX.Element {
  const formattedDate = format(new Date(date), 'dd.MM.yyyy HH:mm');
  return (
    <div className={classes.post}>
      <img className={classes.imgContainer} src={photo} alt="Users face" />
      <div className={classes.rightContainer}>
        <h1>
          {name}
          {isVerified && <span>
            <PiSealCheckBold /> Verified client
          </span>}
        </h1>
        <Rating rating={rate} editable={false} size={15} showNumbers={false} />
        <span>{formattedDate}</span>
        <section>
          <h1>{comment.header}</h1>
          <p>{comment.text}</p>
        </section>
      </div>
    </div>
  );
}

export default ReviewPost;
