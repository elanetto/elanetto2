export default function StarRating({ rating = 0 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i}>
        {i <= Math.round(rating) ? "⭐" : "☆"}
      </span>
    );
  }

  return <div className="text-lg">{stars}</div>;
}