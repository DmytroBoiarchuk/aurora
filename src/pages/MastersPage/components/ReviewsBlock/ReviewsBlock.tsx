import React from 'react';
import Block from '../../../../UI/Block/Block';
import ReviewPost from './components/Post/ReviewPost';
import usersData from '../../../../database/usersData';
import ReviewInput from "./components/ReviewInput/ReviewInput";

function ReviewsBlock(): JSX.Element {
    //re render component after new comment
  return (
    <Block>
      {usersData.reviews.map((review) => (
        <ReviewPost key={review.id} reviewData={review} />
      ))}
      <ReviewInput />
    </Block>
  );
}

export default ReviewsBlock;
