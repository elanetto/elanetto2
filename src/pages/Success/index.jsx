// src/pages/Success.jsx

import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Takk for kjøpet!
      </h1>

      <p className="text-lg mb-6">
        Bestillingen din er mottatt og blir behandlet 💌
      </p>

      <Link
        to="/"
        className="bg-[#6e3b34] text-white px-6 py-3 rounded-xl hover:opacity-90"
      >
        Tilbake til forsiden
      </Link>
    </div>
  );
}