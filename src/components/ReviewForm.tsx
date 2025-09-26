import React, { useState } from "react";
import { t } from "i18next";
import type { Review } from "../types";

interface ReviewFormProps {
  onSubmit: (review: Omit<Review, "id" | "date">) => void;
  onCancel: () => void;
  errorMessage?: string;
}

export function ReviewForm({
  onSubmit,
  onCancel,
  errorMessage,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (userName.trim().length < 2) {
      alert(t("nameMinLength"));
      return;
    }

    if (comment.trim().length < 10) {
      alert(t("commentMinLength"));
      return;
    }

    if (comment.trim().length > 500) {
      alert(t("commentMaxLength"));
      return;
    }

    // Check for spam-like content
    if (isSpamContent(comment)) {
      alert(t("spamDetected"));
      return;
    }

    setIsSubmitting(true);

    // Simulate delay to prevent rapid submissions
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onSubmit({
      userId: generateUserId(userName), // Generate consistent user ID
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
    });

    setIsSubmitting(false);
    // Reset form
    setRating(5);
    setComment("");
    setUserName("");
  };

  const isSpamContent = (text: string): boolean => {
    const spamPatterns = [
      /(.)\1{4,}/g, // Repeated characters (aaaaa)
      /^(.+)(\1){3,}$/g, // Repeated words/phrases
      /(buy now|click here|free money|guaranteed)/gi, // Common spam phrases
    ];

    return spamPatterns.some((pattern) => pattern.test(text));
  };

  const generateUserId = (userName: string): string => {
    // Simple hash function for consistent user ID
    let hash = 0;
    for (let i = 0; i < userName.length; i++) {
      const char = userName.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return `user-${Math.abs(hash)}`;
  };

  return (
    <div className="review-form-container">
      <form onSubmit={handleSubmit} className="review-form">
        <h3>{t("writeReview")}</h3>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="form-group">
          <label htmlFor="userName">{t("yourName")}:</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            minLength={2}
            maxLength={50}
            placeholder={t("enterYourName")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">{t("rating")}:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} {t("stars", { count: num })}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">{t("comment")}:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            minLength={10}
            maxLength={500}
            rows={4}
            placeholder={t("shareYourExperience")}
          />
          <small className="character-count">
            {comment.length}/500 {t("characters")}
          </small>
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("submitting") : t("submitReview")}
          </button>
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
