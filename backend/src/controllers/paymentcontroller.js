const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);// Load Stripe with your secret key
const router = express.Router();

// Payment route
async function payment_method(req, res) {
  try {
    const { payment_method, currency, paymentMethodId } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe works with the smallest currency unit (e.g., cents)
      currency: currency || 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    // Fetch the associated charge to get the receipt URL
    const charges = await stripe.paymentIntents.retrieve(paymentIntent.id, {
        expand: ['charges.data.receipt_url'], // Expand to include charge data
      });
  
    const receiptUrl = charges.charges.data[0].receipt_url; // Receipt URL

    res.send({
        clientSecret: paymentIntent.client_secret,
        successMessage: "Your payment was successful! A receipt has been sent to your email.",
      })
    } catch (error) {
    res.status(500).json({
      message: 'Payment failed',
      error: error.message,
    });
  }
}

module.exports = { payment_method }