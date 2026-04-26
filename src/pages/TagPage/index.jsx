import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../lib/sanity";
import ProductCard from "../../components/ProductCard";

export default function TagPage() {
  const { tag } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && $tag in tags]{
          _id,
          title,
          price,
          slug,
          images
        }`,
        { tag },
      )
      .then(setProducts);
  }, [tag]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Alle "{tag}" produkter</h1>

      {products.length === 0 && <p>Ingen produkter funnet 🥺</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
