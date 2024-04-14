import { IReview } from "@/api/specs/reviews";
import React, { FC, useMemo, useRef } from "react";
import * as classes from "./reviewsListItem.module.scss";
import { convertDate } from "@/helpers/convertDate";

interface ReviewItemProps {
  review: IReview;
}

const ReviewsListItem: FC<ReviewItemProps> = ({ review }) => {
  const reviewWrapperClassByType = useMemo(() => {
    return review.type === "Негативный"
      ? classes.reviewWrapperNegative
      : review.type === "Позитивный"
      ? classes.reviewWrapperPositive
      : classes.reviewWrapperNeutral;
  }, [review]);

  return (
    <article className={`${classes.reviewWrapper} ${reviewWrapperClassByType}`}>
      <div
        className={classes.reviewTop}
      >
        <div className={classes.author}>{review.author}</div>
        <div className={classes.type}>{review.type}</div>
        <div className={classes.date}>{convertDate(review.createdAt)}</div>
      </div>
      <p className={classes.review}>{review.review}</p>
    </article>
  );
};

export default ReviewsListItem;
