import React, { FC } from 'react';
import { Pagination } from 'antd';

interface ReviewsListProps {
  fetchReviews: () => Promise<void>;
}

const ReviewsList: FC<ReviewsListProps> = () => {
  
  
  return (
    <div>


      <Pagination/>
    </div>
  );
};

export default ReviewsList;
