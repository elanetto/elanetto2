import { useEffect, useState } from "react";
import { client } from "../../../lib/sanity";
import ReviewItem from "../ReviewItem";
import StarRating from "../StarRating";

export default function ReviewList({ productId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "review" && product._ref == $id && approved == true] | order(_createdAt desc)`,
        { id: productId }
      )
      .then(setReviews);
  }, [productId]);

  // ⭐ Beregn gjennomsnitt
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="mt-4">

      {/* ⭐ RATING HEADER */}
      {reviews.length > 0 ? (
        <div className="mb-6 flex items-center gap-3">
          <StarRating rating={averageRating} />

          <span className="font-semibold">
            {averageRating} av 5
          </span>

          <span className="text-gray-500 text-sm">
            ({reviews.length} anmeldelser)
          </span>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Ingen anmeldelser enda 🥺
        </p>
      )}

      {/* 📦 LISTE */}
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <ReviewItem key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}