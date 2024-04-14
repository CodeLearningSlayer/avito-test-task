import React, { FC, useState } from "react";
import { Pagination } from "antd";
import { GetReviewsByMovieIdResponse, IReview } from "@/api/specs/reviews";
import { useInView } from "react-intersection-observer";
import ReviewsListItem from "@/components/ReviewsListItem/ReviewsListItem";
import * as classes from "./reviewsLists.module.scss";

interface ReviewsListProps {
  fetchReviews: (page: number) => Promise<GetReviewsByMovieIdResponse>;
}

const ReviewsList: FC<ReviewsListProps> = ({ fetchReviews }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [totalReviews, setTotalReviews] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const scrollToBlock = () => {
    document
      .getElementById("reviews123")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePageChange = async (value: number) => {
    try {
      const res = await fetchReviews(value);
      setReviews(res.docs);
      setTotalReviews(res.total);
      setCurrentPage(res.page);
      // scrollToBlock(); // тут выскочил баг, увы, не разобрался почему так происходит
    } catch (e) {
      console.log(e);
    }
  };

  const { ref } = useInView({
    triggerOnce: true,

    onChange: async (inView) => {
      if (inView) {
        const res = await fetchReviews(currentPage);
        setReviews(res.docs); // беру только по 1му сезону из селекта
        setTotalReviews(res.total);
      }
    },
  });

  return (
    <div id="reviews123" className={classes.reviewsList} ref={ref}>
      {reviews.length > 0 ? (
        <>
          {reviews.map((item) => {
            return <ReviewsListItem review={item} key={item.id} />;
          })}
          <Pagination
            showSizeChanger={false}
            defaultCurrent={currentPage}
            total={totalReviews}
            pageSize={3}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <>Отзывов не найдено</>
      )}
    </div>
  );
};

export default ReviewsList;
