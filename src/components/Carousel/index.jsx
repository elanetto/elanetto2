import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

export function CarouselComponent({ images = [], title }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {images.length > 0 && (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={5000}
          className="mb-6 rounded-xl shadow"
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setSelectedImage(img)
              }
              role="button"
              tabIndex={0}
              className="cursor-zoom-in"
            >
              <img
                src={img}
                alt={`Slide ${index + 1} for ${title}`}
                className="rounded-xl h-[300px] sm:h-[400px] md:h-[500px] object-cover object-center w-full"
              />
            </div>
          ))}
        </Carousel>
      )}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="max-h-[90vh] max-w-[90vw] rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
