// src/pages/Cancel.jsx

import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        ❌ Betaling avbrutt
      </h1>

      <p className="text-lg mb-6">
        Ingen betaling ble gjennomført. Du kan prøve igjen når som helst 🙂
      </p>

      <Link
        to="/handlekurv"
        className="bg-[#6e3b34] text-white px-6 py-3 rounded-xl hover:opacity-90"
      >
        Tilbake til handlekurv
      </Link>
    </div>
  );
}