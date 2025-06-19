import { CarouselComponent } from "./../../components/Carousel";

import anetteImage1 from "./../../assets/images/anette/anette-stand-bogerud-2.jpg";
import anetteImage2 from "./../../assets/images/anette/anette-stand-bogerud-1.jpg";

function Om() {
  const anetteImages = [anetteImage1, anetteImage2];

  return (
    <div className="w-full flex flex-col items-center mx-auto justify-center py-10">
      <div className="w-full max-w-4xl px-2">
        <CarouselComponent images={anetteImages} title="Anette - elanetto" />
      </div>
      <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8 text-center mt-2">
        <h1 className="text-5xl text-pink-900 mt-2 chewy-regular">
          Om elanetto Design
        </h1>
        <p className="pt-4">
          Hei, der! Jeg heter Anette "elanetto" Therese Lindberg, og lager
          hjemmelagde klistremerker. Jeg tegner dem i Procreate på min iPad,
          printer dem på min Epson EcoTank Printer, og kutter dem med min
          Shiluette Cameo 4 kuttemaskin.
        </p>
        <p className="pt-2">
          Er du interrisert i å kjøpe noen av mine klistremerker? Ta kontakt,
          eller besøk min Etsy!
        </p>
      </div>

      <div className="text-center mt-8">
        <h2 className="text-4xl md:text-3xl font-bold chewy-regular text-pink-900">
          Ta kontakt:
        </h2>
        <p className="pb-2">
          <button
            onClick={() =>
              (window.location.href = [
                "mailto:",
                "post",
                "@",
                "elanetto",
                ".no",
              ].join(""))
            }
            className="underline text-dirtyrosa hover:text-pink-950 cursor-pointer"
            aria-label="Send e-post til post@elanetto.no"
          >
            {["post", "@", "elanetto", ".", "no"].join("")}
          </button>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-8 my-10 justify-center">
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
    </div>
  );
}

export default Om;
