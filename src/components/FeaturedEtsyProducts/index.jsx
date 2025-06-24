import teaTimeSheet from "./../../assets/etsy/sticker_sheet_02.png";
import coffeeSheet from "./../../assets/etsy/sticker_sheet_03.png";
import plantsSheet from "./../../assets/etsy/sticker_sheet_09.png";
import singlePlant from "./../../assets/etsy/single_sticker_26.png";

export default function FeaturedEtsyProducts() {
  const products = [
    {
      title: "Tea Time",
      image: teaTimeSheet,
      link: "https://www.etsy.com/no-en/listing/1410769233/cute-tea-time-sticker-sheet-bullet?ref=shop_home_feat_1&logging_key=1f88ec0a292d5f1eebeb9f37c055a2b4576d6a21%3A1410769233",
    },
    {
      title: "Coffee Time",
      image: coffeeSheet,
      link: "https://www.etsy.com/no-en/listing/1411321507/cute-coffee-sticker-sheet-bullet-journal?ref=shop_home_active_2&logging_key=26a2b53fac7a1b0d7357b630abc744dbae0e9a7a%3A1411321507",
    },
    {
      title: "Plants",
      image: plantsSheet,
      link: "https://www.etsy.com/no-en/listing/1397134772/plants-sticker-sheet-bullet-journal?ref=shop_home_feat_3&logging_key=17864461157f34ad9e5ebc2e5b207aa881cac6f3%3A1397134772",
    },
    {
      title: "Happy Plant",
      image: singlePlant,
      link: "https://www.etsy.com/no-en/listing/1640672814/happy-plant-die-cut-sticker-kawaii?ref=shop_home_feat_2&logging_key=a186f282838b0be6b0e0a032ad7ccff0d13e8612%3A1640672814",
    },
  ];

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center chewy-regular text-pink-900 mb-8">
        Utvalgte Etsy-produkter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow hover:shadow-lg hover:scale-110 transition overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="bg-dirtyrosa w-full h-full py-2">
              <h3 className="font-semibold text-white text-sm text-center">
                {item.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
