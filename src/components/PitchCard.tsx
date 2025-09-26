import { t } from "i18next";
import type { Pitch, PitchTag, Review } from "../types";
import Ratings from "./Ratings";
import { useState, useEffect } from "react";
import "../styles/pitch-card.css";
import "../styles/reviews.css";
import MoreInfo from "./MoreInfoCard";
import {
  getRecentReviews,
  calculateAverageRating,
} from "../utilities/calculateRating";
import { ReviewsList } from "./ReviewList";
import Toggle from "./Toggle";
import { PITCH_TAGS } from "../constants";
import { ReviewForm } from "./ReviewForm";

const STORAGE_KEY = "pitch-reviews";

export default function PitchCard({ pitch }: { pitch: Pitch }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreInfoOpen, setMoreInfoOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [pitchReviews, setPitchReviews] = useState<Review[]>([]);
  const [currentRating, setCurrentRating] = useState(pitch.rating);

  const isMobile = windowWidth < 720;

  // Calculate rating whenever pitchReviews changes
  useEffect(() => {
    if (pitchReviews.length > 0) {
      const updatedPitch = { ...pitch, reviews: pitchReviews };
      const newRating = calculateAverageRating(updatedPitch);
      setCurrentRating(newRating);
    } else {
      // Use original pitch rating when no reviews exist
      setCurrentRating(pitch.baseRating || pitch.rating);
    }
  }, [pitchReviews, pitch.rating, pitch.baseRating, pitch]);

  // Load reviews from localStorage on mount
  useEffect(() => {
    try {
      const storageKey = `${STORAGE_KEY}-${pitch.id}`;
      const storedData = localStorage.getItem(storageKey);

      if (storedData) {
        const parsedReviews: Review[] = JSON.parse(storedData).map(
          (review: Review) => ({
            ...review,
            date: new Date(review.date),
          })
        );

        setPitchReviews(parsedReviews);
      } else {
        // Initialize with original pitch reviews
        setPitchReviews(pitch.reviews || []);
      }
    } catch (error) {
      console.error("Error loading reviews from localStorage:", error);
      setPitchReviews(pitch.reviews || []);
    }
  }, [pitch.id, pitch.reviews]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save reviews to localStorage whenever pitchReviews changes
  useEffect(() => {
    try {
      const storageKey = `${STORAGE_KEY}-${pitch.id}`;
      if (pitchReviews.length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(pitchReviews));
      }
    } catch (error) {
      console.error("Error saving reviews to localStorage:", error);
    }
  }, [pitchReviews, pitch.id]);

  const handleMoreInfoToggle = () => setMoreInfoOpen((prev) => !prev);
  const handleReviewsToggle = () => setReviewsOpen((prev) => !prev);

  const handleSubmitReview = (review: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...review,
      id: crypto.randomUUID(),
      date: new Date(),
    };

    const updatedReviews = [...pitchReviews, newReview];
    setPitchReviews(updatedReviews);
    setShowReviewForm(false);

    // Log for debugging
    console.log("New review added:", newReview);
    console.log("Updated reviews:", updatedReviews);
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
  };

  const getDisplayReviews = () => {
    const sortedReviews = getRecentReviews({ ...pitch, reviews: pitchReviews });
    return showAllReviews ? sortedReviews : sortedReviews.slice(0, 1);
  };

  const renderReviewsSection = () => {
    const displayReviews = getDisplayReviews();
    const totalReviews = pitchReviews.length;
    const hasMoreReviews = totalReviews > 1;

    if (isMobile) {
      return (
        <>
          <Toggle
            title={`${t("reviews")}`}
            open={reviewsOpen}
            onClick={handleReviewsToggle}
            ariaControls="reviews-section"
          />
          {reviewsOpen && (
            <div>
              <div className="review-actions">
                <button
                  className="write-review-btn"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  {showReviewForm ? t("cancel") : t("writeReview")}
                </button>
              </div>

              {showReviewForm && (
                <ReviewForm
                  onSubmit={handleSubmitReview}
                  onCancel={handleCancelReview}
                />
              )}

              <ReviewsList reviews={displayReviews} />

              {hasMoreReviews && (
                <div className="show-more-reviews">
                  <button
                    className="show-more-btn"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews
                      ? t("showFewerReviews")
                      : t("showMoreReviews", { count: totalReviews - 1 })}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      );
    }

    return (
      <div>
        <div className="review-actions">
          <button
            className="write-review-btn"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? t("cancel") : t("writeReview")}
          </button>
        </div>

        {showReviewForm && (
          <ReviewForm
            onSubmit={handleSubmitReview}
            onCancel={handleCancelReview}
          />
        )}

        <ReviewsList reviews={displayReviews} />

        {hasMoreReviews && (
          <div className="show-more-reviews">
            <button
              className="show-more-btn"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews
                ? t("showFewerReviews")
                : t("showMoreReviews", { count: totalReviews - 1 })}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pitch-card">
      <li className="pitch-item">
        <div className="pitch-description">
          <h2>{pitch.name}</h2>
          <p>
            <strong>{t("location")}:</strong> {pitch.location}
          </p>
          <p>
            <strong>{t("rating")}:</strong> <Ratings value={currentRating} />
            {pitchReviews.length > 0 && (
              <span className="rating-info">
                {" "}
                ({currentRating}/5 based on {pitchReviews.length} reviews)
              </span>
            )}
          </p>
          <p>
            <strong>{t("maxPlayers")}:</strong> {pitch.maxPlayers}
          </p>
          <p>
            <strong>{t("price")}:</strong> {pitch.price}
          </p>

          <div className="pitch-tags">
            {PITCH_TAGS.map(
              (tag: PitchTag) =>
                pitch[tag.key as keyof Pitch] && (
                  <span key={tag.key} className={`pitch-tag ${tag.className}`}>
                    {t(tag.label)}
                  </span>
                )
            )}
          </div>

          {renderReviewsSection()}

          <Toggle
            title={t("moreInfo")}
            open={moreInfoOpen}
            onClick={handleMoreInfoToggle}
            ariaControls="more-info-section"
          />
          {moreInfoOpen && pitch.moreInfo && <MoreInfo info={pitch.moreInfo} />}
        </div>

        {!isMobile && (
          <div className="pitch-image-container">
            <img
              src={pitch.imageUrl}
              alt={pitch.name}
              className="pitch-card-image"
            />
          </div>
        )}
      </li>
    </div>
  );
}
