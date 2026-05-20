import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid items" });
    }

    // 🧠 fallback hvis origin mangler
    const origin =
      req.headers.origin ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:5173";

    const line_items = items.map((item) => ({
      price_data: {
        currency: "nok",
        product_data: {
          name: item.title || "Produkt",
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      // 📧 Send kvittering automatisk til kunden
      payment_intent_data: {
        receipt_email: null,
      },

      // 📦 BE OM ADRESSE
      shipping_address_collection: {
        allowed_countries: ["NO"],
      },

      // 📱
      phone_number_collection: {
        enabled: true,
      },

      // 🧾
      billing_address_collection: "auto",

      // ✅ Redirects
      success_url: `${origin}/success`,
      cancel_url: `${origin}/handlekurv`,
    });

    console.log("✅ Stripe session opprettet:", session.id);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe error:", err);
    return res.status(500).json({ error: err.message });
  }
}
