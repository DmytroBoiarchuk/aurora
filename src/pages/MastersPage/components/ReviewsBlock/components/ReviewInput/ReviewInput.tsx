import React from 'react';
import classes from './ReviewInput.module.scss';
import { loggedInUserData } from '../../../../../../database/usersData';
import MediumButton from '../../../../../../UI/M-Button/MediumButton';
import { ReviewProps } from '../../../../../../assets/interfaces/interfaces';
import Rating from '../../../Rating/Rating';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
import { setNewPost } from '../../../../../../store/modules/reviewsReducer/reducer';

function ReviewInput(): JSX.Element {
  const { id, name, photo } = loggedInUserData;
  const dispatch = useAppDispatch();
  const rating = useAppSelector((state) => state.reviewingRatingReducer.rating);
  function handleSubmit(e:React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
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
    //+ send request
    dispatch(setNewPost(reviewRequestData));
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
