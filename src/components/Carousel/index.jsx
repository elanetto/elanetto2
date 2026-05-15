import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

export function CarouselComponent({ images = [], title }) {
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
            <Link
              key={index}
              to={`/${img.slug}`}
              className="block"
            >
              <img
                src={img.image}
                alt={`Slide ${index + 1} for ${title}`}
                className="rounded-xl h-[300px] sm:h-[400px] md:h-[500px] object-cover object-center w-full cursor-pointer hover:opacity-95 transition"
              />
            </Link>
          ))}
        </Carousel>
      )}
    </>
  );
}