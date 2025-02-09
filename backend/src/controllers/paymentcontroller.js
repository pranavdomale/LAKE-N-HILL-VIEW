const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function payment_method(req, res) {
    console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
    const { amount, currency = "inr", paymentMethodId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency,
            payment_method: paymentMethodId,
            confirm: true,
        });

        const charges = await stripe.paymentIntents.retrieve(paymentIntent.id, {
            expand: ["charges"],
        });

        const receiptUrl = charges.charges.data.length > 0 ? charges.charges.data[0].receipt_url : null;

        res.json({
            clientSecret: paymentIntent.client_secret,
            receiptUrl,
            successMessage: "Your payment was successful! A receipt has been sent to your email.",
        });
    } catch (error) {
        res.status(500).json({
            message: "Payment failed",
            error: error.message,
        });
    }
}

module.exports = { payment_method };