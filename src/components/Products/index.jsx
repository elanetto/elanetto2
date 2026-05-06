import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import ProductCard from "../ProductCard";
import CustomSelect from "../CustomSelect";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 6;

  useEffect(() => {
    setPage(1);
  }, [search, sort, category]);

  useEffect(() => {
    const fetchProducts = async () => {
      const cleanedSearch = search
        .toLowerCase()
        .trim()
        .replace(/[^\wæøå ]/gi, "");

      let order = "_createdAt desc";
      if (sort === "priceLow") order = "price asc";
      if (sort === "priceHigh") order = "price desc";

      const searchTerms = cleanedSearch.split(" ").filter(Boolean);

      const searchFilter =
        searchTerms.length > 0
          ? searchTerms
              .map(
                (_, i) => `
        (
          coalesce(title.no, "") match $term${i} ||
          coalesce(description.no, "") match $term${i} ||
          $rawTerm${i} in tags
        )
      `,
              )
              .join(" && ")
          : "true";

      const categoryFilter =
        category === "all"
          ? "true"
          : category === "bundle"
            ? `_type == "bundle"`
            : `category == $category`;

      const query = `
        *[
          (_type == "product" || _type == "bundle") &&
          ${categoryFilter} &&
          ${searchFilter}
        ]
        | order(${order})
        [0...${page * PAGE_SIZE}]
        {
          _id,
          _type,
          title,
          slug,
          price,
          images,
          image,
          category,
          products[]->{
            price,
            images
          }
        }
      `;

      const params = searchTerms.reduce((acc, term, i) => {
        acc[`term${i}`] = `*${term}*`;
        acc[`rawTerm${i}`] = term;
        return acc;
      }, {});

      if (category !== "all" && category !== "bundle") {
        params.category = category;
      }

      const data = await client.fetch(query, params);

      // 🔥 NORMALISER DATA
      const normalized = data.map((item) => {
        if (item._type === "bundle") {
          const total = (item.products || []).reduce(
            (sum, p) => sum + (p.price || 0),
            0,
          );

          const discounted = total * 0.8;
          const price = Math.round(discounted / 5) * 5;

          return {
            ...item,
            price,
            isBundle: true,

            // 🔥 HER ER MAGIEN
            images: item.image
              ? [item.image]
              : item.products?.[0]?.images?.[0]
                ? [item.products[0].images[0]]
                : [],
          };
        }

        return {
          ...item,
          isBundle: false,
        };
      });

      setProducts(normalized);
    };

    fetchProducts();
  }, [search, sort, page, category]);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {category === "bundle"
          ? "Pakker 🎁"
          : category === "all"
            ? "Alle produkter"
            : category === "sticker"
              ? "Klistremerker"
              : category === "bookmark"
                ? "Bokmerker"
                : "Kort"}
      </h1>

      {/* 🔎 FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* SØK */}
        <input
          type="text"
          placeholder="Søk etter produkter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6e3b34]/30"
        />

        {/* KATEGORI */}
        <CustomSelect
          value={category}
          onChange={setCategory}
          options={[
            { value: "all", label: "Alle" },
            { value: "sticker", label: "Klistremerker" },
            { value: "bookmark", label: "Bokmerker" },
            { value: "card", label: "Kort" },
            { value: "bundle", label: "Pakker 🎁" },
          ]}
        />

        {/* SORTERING */}
        <CustomSelect
          value={sort}
          onChange={setSort}
          options={[
            { value: "newest", label: "Nyeste" },
            { value: "priceLow", label: "Pris: lav → høy" },
            { value: "priceHigh", label: "Pris: høy → lav" },
          ]}
        />
      </div>

      {/* 🛍️ GRID */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Ingen produkter funnet 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              link={
                product.isBundle
                  ? `#/bundle/${product.slug?.current}`
                  : `#/produkt/${product.slug?.current}`
              }
            />
          ))}
        </div>
      )}

      {/* 📄 LOAD MORE */}
      {products.length >= page * PAGE_SIZE && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-[#6e3b34] text-white px-6 py-2 rounded-xl hover:opacity-90"
          >
            Last flere
          </button>
        </div>
      )}
    </div>
  );
}
