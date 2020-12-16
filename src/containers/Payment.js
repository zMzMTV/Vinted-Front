import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm.js";

// Stripe key
const stripePromise = loadStripe(
  "pk_test_51HoUxZLK2GtskZhIWiWbTdSaHYyU25sD2oCAETJq5XrGJh53GStHQwAURSLXp9M9ccXDRyDOt6XEPVrsuk5xNI8900NvLM0xfs"
);

const Payment = () => {
  const location = useLocation();
  const title = location.state.title;
  const amount = location.state.amount;

  const amount1 = amount * 0.1;
  const amount2 = amount * 0.2;

  const total = Number(amount + amount1 + amount2).toFixed(2);

  console.log({ title });
  console.log({ amount });

  return (
    <>
      <div className="payment-wrapper">
        <div className="payment-container">
          <div className="payment-card">
            <h4 className="title">Résumé de la commande</h4>
            <div className="content">
              <ul>
                <li>
                  Commande :<span>{amount} €</span>
                </li>
                <li>
                  Frais protection acheteurs :
                  <span>{amount1.toFixed(2)} €</span>
                </li>
                <li>
                  Frais de port :<span>{amount2.toFixed(2)} €</span>
                </li>
              </ul>
            </div>
            <div className="divider"></div>
            <div className="content">
              <ul>
                <li className="bold">
                  Total :<span className="bold">{total} €</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="payment-card">
            <div className="content">
              <p>
                Il ne vous reste plus qu'un étape pour vous offrir
                <span className="bold"> {title}</span>. Vous allez payer :
                <span className="bold"> {total} € </span>
                (frais de protection et frais de port inclus).
              </p>
              <div className="divider"></div>
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={amount} title={title} />
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
