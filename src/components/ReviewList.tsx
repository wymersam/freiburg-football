import { t } from "i18next";
import type { Review } from "../types";
import { useEffect, useState } from "react";

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth < 720;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (reviews.length === 0) {
    return <p>No reviews yet. Be the first to write one!</p>;
  }

  return (
    <div className="reviews-list">
      {!isMobile && <span className="reviews-title">{t("reviews")}</span>}
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <span className="reviewer-name">{review.userName}</span>
            <span className="review-rating">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </span>
            <span className="review-date">
              {review.date.toLocaleDateString()}
            </span>
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
