import React, { useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import classes from './Reting.module.scss';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { setReviewingRating } from '../../../../store/modules/ratingReducer/reducer';

interface RatingProps {
  editable: boolean;
  rating?: number | undefined;
  showNumbers: boolean;
  size: number;
}
function Rating({ editable, rating, showNumbers, size }: RatingProps): JSX.Element {
  const [currentRating, setCurrentRating] = useState<number>(0);
  const dispatch = useAppDispatch();
  function onChangeHandler(e: number): void {
    setCurrentRating(e);
    dispatch(setReviewingRating(e));
  }

  return (
    <div className={classes.rating}>
      <ReactStarsRating
        starGap={10}
        onChange={(e: number): void => onChangeHandler(e)}
        isEdit={editable}
        value={editable? currentRating : rating }
        size={size}
      />
      {showNumbers && <p>{rating}</p>}
    </div>
  );
}

export default Rating;
