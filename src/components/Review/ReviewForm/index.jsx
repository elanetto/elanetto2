import { useState } from "react";
import { client } from "../../../lib/sanity";

export default function ReviewForm({ productId }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await client.create({
      _type: "review",
      product: {
        _type: "reference",
        _ref: productId,
      },
      name,
      rating: Number(rating),
      comment,
      approved: false,
    });

    setSubmitted(true);
    setName("");
    setComment("");
    setRating(5);
  };

  if (submitted) {
    return (
      <p className="text-green-600 text-sm">
        Takk! Anmeldelsen din må godkjennes først 💌
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#e8b6b9] rounded-xl p-4 shadow-sm flex flex-col gap-3"
    >
      <h3 className="font-semibold">Legg igjen en anmeldelse</h3>

      <input
        type="text"
        placeholder="Navnet ditt"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="bg-white rounded px-3 py-2 text-sm"
      />

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="bg-white rounded px-3 py-2 text-sm"
      >
        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
        <option value="4">⭐️⭐️⭐️⭐️</option>
        <option value="3">⭐️⭐️⭐️</option>
        <option value="2">⭐️⭐️</option>
        <option value="1">⭐️</option>
      </select>

      <textarea
        placeholder="Hva synes du?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className="bg-white rounded px-3 py-2 text-sm"
      />

      <button
        type="submit"
        className="bg-[#6e3b34] text-white py-2 rounded-lg hover:opacity-90"
      >
        Send anmeldelse
      </button>
    </form>
  );
}