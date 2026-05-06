import { useState } from "react";
import { urlFor } from "../../lib/image";
import ImageModal from "../ImageModal";

export default function ImageGallery({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  if (!images?.length) return <p>Mangler bilde</p>;

  const currentImage = images[currentIndex];

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }

    if (distance < -50) {
      setCurrentIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      {/* MAIN IMAGE */}
      <div className="flex flex-col gap-4">
        <div
          className="bg-[#e8b6b9] rounded-2xl p-10 flex items-center justify-center h-[450px] cursor-zoom-in relative group"
          onClick={() => setIsOpen(true)}
          onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
          onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
          onTouchEnd={handleSwipe}
        >
          <img
            src={urlFor(currentImage).width(800).url()}
            alt={currentImage?.alt || title}
            className="max-h-full object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  );
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full"
              >
                ‹
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  );
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* THUMBNAILS */}
        {images.length > 1 && (
          <div className="flex gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border ${
                  currentIndex === index
                    ? "border-[#6e3b34]"
                    : "border-transparent"
                }`}
              >
                <img
                  src={urlFor(img).width(200).url()}
                  alt={img?.alt || title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {isOpen && (
        <ImageModal
          image={currentImage}
          alt={title}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}