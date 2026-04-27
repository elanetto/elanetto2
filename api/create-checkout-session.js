import Stripe from "stripe";

// eslint-disable-next-line no-undef
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { items } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "nok",
        product_data: {
          name: item.title,
          images: item.images?.[0]
            ? [item.images[0]]
            : [],
        },
        unit_amount: item.price * 100, // øre
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/handlekurv`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}