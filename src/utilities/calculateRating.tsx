import type { Pitch, Review } from "../types";

export function calculateAverageRating(pitch: Pitch): number {
  if (pitch.reviews.length === 0) {
    return pitch.baseRating || 0;
  }

  const sum = pitch.reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / pitch.reviews.length) * 10) / 10; // Round to 1 decimal
}

export function addReview(
  pitches: Pitch[],
  pitchId: number,
  review: Omit<Review, "id" | "date">
): Pitch[] {
  return pitches.map((pitch) => {
    if (pitch.id === pitchId) {
      const newReview: Review = {
        ...review,
        id: crypto.randomUUID(),
        date: new Date(),
      };

      const updatedPitch = {
        ...pitch,
        reviews: [...pitch.reviews, newReview],
      };

      // Update the rating based on all reviews
      updatedPitch.rating = calculateAverageRating(updatedPitch);

      return updatedPitch;
    }
    return pitch;
  });
}

export function getRecentReviews(pitch: Pitch, limit: number = 5): Review[] {
  return pitch.reviews
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, limit);
}
