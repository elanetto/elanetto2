export default function ReviewItem({ review }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium">{review.name}</p>

        {/* ⭐ rating */}
        <div className="text-yellow-500 text-sm">
          {"⭐".repeat(review.rating)}
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
}