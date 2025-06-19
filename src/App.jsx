import { CarouselComponent } from "./components/Carousel";
import InstagramEmbed from "./components/InstagramEmbed";
import FeaturedEtsyProducts from "./components/FeaturedEtsyProducts";
import video from "./assets/video/S0003-video.MP4";
import videoPreview from "./assets/video/S0003-02.jpg";

import tcgImage1 from "./assets/images/tcg/tcg-box-black-toxic-2.jpg";
import tcgImage2 from "./assets/images/tcg/tcg-binder-red-organised-2.jpg";
import tcgImage3 from "./assets/images/tcg/tcg-box-blue-nerdy-2.jpg";
import tcgImage4 from "./assets/images/tcg/tcg-box-red-horse-2.jpg";
import tcgImage5 from "./assets/images/tcg/tcg-binder-black-precious-2.jpg";

function App() {
  const tcgImages = [tcgImage1, tcgImage2, tcgImage3, tcgImage4, tcgImage5];

  return (
    <div className="w-full flex flex-col items-center mx-auto justify-center py-10">
      <div className="w-full max-w-4xl px-2">
        <CarouselComponent images={tcgImages} title="TCG carousel" />
      </div>
      <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8 text-center mt-2 mb-8">
        <h1 className="text-5xl text-pink-900 mt-2 chewy-regular">
          Hjemmelagde klistremerker: TCG edition
        </h1>
        <p className="pt-4">
          Se noen av mine TCG stickers her, og møt meg gjerne på Pokèmon
          NM i Moss, 21 juni!
        </p>
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
