import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import base_url from "../../BaseUrl";

const CardPayment = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    try {
      const { data } = await axios.post(`${base_url}card-pay`, {
        amount: Math.round(amount * 100), // Stripe expects cents
      });

      const clientSecret = data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment} style={{ width: "95%" }}>
      <CardElement />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        style={{
          marginTop: "16px",
          justifySelf: "center",
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        {processing ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CardPayment;
