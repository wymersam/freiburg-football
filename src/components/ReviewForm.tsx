import React, { useState } from "react";
import type { Review } from "../types";

interface ReviewFormProps {
  onSubmit: (review: Omit<Review, "id" | "date">) => void;
  onCancel: () => void;
}

export function ReviewForm({ onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && comment.trim()) {
      onSubmit({
        userId: "user-temp-id",
        userName: userName.trim(),
        rating,
        comment: comment.trim(),
      });
      // Reset form
      setRating(5);
      setComment("");
      setUserName("");
    }
  };

  return (
    <div className="review-form-container">
      <form onSubmit={handleSubmit} className="review-form">
        <h3>Write a Review</h3>

        <div className="form-group">
          <label htmlFor="userName">Your Name:</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            placeholder="Share your experience..."
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Submit Review</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
