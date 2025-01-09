import React from 'react';
import Block from '../../../../UI/Block/Block';
import ReviewPost from './components/Post/ReviewPost';
import ReviewInput from "./components/ReviewInput/ReviewInput";
import { useAppSelector } from '../../../../hooks/reduxHooks';

function ReviewsBlock(): JSX.Element {
  const reviewPosts = useAppSelector((state) => state.reviewsReducer.reviews);
  return (
    <Block>
      {reviewPosts.map((review) => (
        <ReviewPost key={review.id} reviewData={review} />
      ))}
      <ReviewInput />
    </Block>
  );
}

export default ReviewsBlock;
