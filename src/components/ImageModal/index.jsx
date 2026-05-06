import { useEffect } from "react";
import { urlFor } from "../../lib/image";

export default function ImageModal({ image, alt, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl z-10"
        >
          ✕
        </button>

        <img
          src={urlFor(image).width(1000).url()}
          alt={alt}
          className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl"
        />
      </div>
    </div>
  );
}