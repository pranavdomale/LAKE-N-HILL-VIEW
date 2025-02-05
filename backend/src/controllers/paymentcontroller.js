const express = require("express");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

async function payment_method(req, res) {
    const { amount, currency = "inr", paymentMethodId } = req.body;

    try {
        // Convert amount to the smallest currency unit
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to the smallest currency unit
            currency,
            payment_method: paymentMethodId,
            confirm: true, // Confirm the payment
        });

        // Fetch the associated charge to get the receipt URL
        const charges = await stripe.paymentIntents.retrieve(paymentIntent.id, {         
            expand: ['charges'],
        });

        const receiptUrl = charges.charges.data.length > 0 ? charges.charges.data[0].receipt_url : null;

        res.json({
            clientSecret: paymentIntent.client_secret,
            receiptUrl,
            successMessage: "Your payment was successful! A receipt has been sent to your email.",
        });
    } catch (error) {
        res.status(500).json({
            message: 'Payment failed',
            error: error.message,
        });
    }
}

module.exports = { payment_method };