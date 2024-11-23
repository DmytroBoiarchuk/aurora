import React, { useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import classes from './Reting.module.scss';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { setRating } from '../../../../store/modules/ratingReducer/reducer';

interface RatingProps {
  editable: boolean;
  rating?: number | undefined;
  showNumbers: boolean;
  size: number;
}
function Rating({ editable, rating, showNumbers, size }: RatingProps): JSX.Element {
  const [currentRating, setCurrentRating] = useState<number | undefined>(rating);
  const dispatch = useAppDispatch();
  function onChangeHandler(e: number): void {
    setCurrentRating(e);
    dispatch(setRating(e));
  }
  return (
    <div className={classes.rating}>
      <ReactStarsRating
        starGap={10}
        onChange={(e): void => onChangeHandler(e)}
        isEdit={editable}
        value={currentRating || 0}
        size={size}
      />
      {showNumbers && <p>{rating}</p>}
    </div>
  );
}

export default Rating;
