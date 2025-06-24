import { CarouselComponent } from "./components/Carousel";
import InstagramEmbed from "./components/InstagramEmbed";
import FeaturedEtsyProducts from "./components/FeaturedEtsyProducts";
import video from "./assets/video/S0003-video.MP4";
import videoPreview from "./assets/video/S0003-02.jpg";

import carouselImage1 from "./assets/images/carousel/carousel-backpack.jpg";
import carouselImage2 from "./assets/images/carousel/carousel-derpduck.jpg";
import carouselImage3 from "./assets/images/carousel/carousel-three-stickersheets.jpg";
import carouselImage4 from "./assets/images/carousel/carousel-yellow-week.jpg";

function App() {
  const carouselImages = [
    carouselImage1,
    carouselImage2,
    carouselImage3,
    carouselImage4,
  ];

  return (
    <div className="w-full flex flex-col items-center mx-auto justify-center py-10">
      <div className="w-full max-w-4xl px-2">
        <CarouselComponent images={carouselImages} title="TCG carousel" />
      </div>
      <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8 text-center mt-2 mb-8">
        <h1 className="text-5xl text-pink-900 mt-2 chewy-regular">
          Hjemmelagde klistremerker
        </h1>
        <p className="pt-4">
          Alle klistremerker er tegnet, printet og kuttet av meg.
        </p>
        <p className="italic">- Anette</p>
      </div>

      <div className="flex flex-col lg:flex-row max-w-5xl w-full gap-6 px-4 sm:px-6 md:px-8 my-10 justify-center items-center">
        <a
          href="https://www.etsy.com/no-en/shop/elanettoDesign"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-dirtyrosa text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-pink-900 transition"
        >
          elanetto's Etsy
        </a>

        <a
          href="https://www.instagram.com/elanetto.design/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-dirtyrosa text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-pink-900 transition"
        >
          elanetto's instagram
        </a>

        <a
          href="https://www.tiktok.com/@elanetto.design"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-dirtyrosa text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-pink-900 transition"
        >
          elanetto's TikTok
        </a>
      </div>

      <FeaturedEtsyProducts />

      <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8 mt-10">
        <video
          src={video}
          controls
          className="w-full rounded-xl shadow-lg"
          poster={videoPreview}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default App;
