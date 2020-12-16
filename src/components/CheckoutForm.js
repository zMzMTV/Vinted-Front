import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ amount, title }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeed, setSucceed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id",
      });

      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://vinted-back-zmzm.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          amount: amount,
          title: title,
        }
      );
      if (response.data.status === "succeeded") {
        setSucceed(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {succeed ? (
        <p className="success">Paiment validé !</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="card-pay">
            <CardElement />
          </div>
          <button type="submit">Valider</button>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
