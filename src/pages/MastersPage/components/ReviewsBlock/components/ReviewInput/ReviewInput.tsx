import React from 'react';
import classes from './ReviewInput.module.scss';
import usersData, { loggedInUserData } from '../../../../../../database/usersData';
import MediumButton from '../../../../../../UI/M-Button/MediumButton';
import { ReviewProps } from '../../../../../../assets/interfaces/interfaces';
import Rating from '../../../Rating/Rating';
import { useAppSelector } from '../../../../../../hooks/reduxHooks';

function ReviewInput(): JSX.Element {
  const { id, name, photo } = loggedInUserData;
  const rating = useAppSelector((state) => state.ratingReducer.rating);
  function handleSubmit(e): void {
    e.preventDefault(e);
    const fd = new FormData(e.target);
    const reviewData = Object.fromEntries(fd.entries());
    const time = new Date().toISOString();
    const reviewRequestData: ReviewProps = {
      id,
      photo,
      name,
      comment: {
        header: reviewData.header.toString(),
        text: reviewData.comment.toString(),
      },
      rate: rating,
      date: time,
      isVerified: undefined,
    };
    //temporary (send request instead)
    usersData.reviews.push(reviewRequestData);
  }
  return (
    <div className={classes.yourReviewContainer}>
      <div>
        <img src={photo} alt="user`s avatar" />
      </div>
      <form onSubmit={handleSubmit} className={classes.reviewForm}>
        <h1>{name}</h1>
        <Rating editable showNumbers={false} size={15} />
        <div className={classes.reviewHeader}>
          <label>Header</label>
          <input maxLength={40} id="header" type="text" name="header" />
        </div>
        <div className={classes.reviewComment}>
          <label>Comment</label>
          <textarea maxLength={1000} id="comment" name="comment" />
        </div>
        <MediumButton>Submit</MediumButton>
      </form>
    </div>
  );
}

export default ReviewInput;
