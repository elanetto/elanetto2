import { urlFor } from "../../../lib/image";

export default function ReviewItem({ review }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex justify-between mb-2">
        <p className="font-medium">{review.name}</p>
        <div>{"⭐".repeat(review.rating)}</div>
      </div>

      <p className="text-sm mb-3">{review.comment}</p>

      {/* 📸 BILDER */}
      {review.images?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {review.images.map((img, i) => (
            <img
              key={i}
              src={urlFor(img).width(150).url()}
              alt="review bilde"
              className="w-16 h-16 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
}