import React from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Payment = ({ address, Amount, stripeApiKey }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  // const stripe = useStripe();
  // const elements = useElements();
  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("stripeApiKey", stripeApiKey);
    // const { data } = await axios.post(
    //   " http://localhost:4000/api/v1/payment/process",
    //   {
    //     amount: Math.round(Amount.totalprice * 100),
    //   }
    // );
    // const client_secret = data.client_secret;
    // if (!stripe || !elements) return;

    // const result = await stripe.confirmCardPayment(client_secret, {
    //   payment_method: {
    //     card: elements.getElement(CardNumberElement),
    //     billing_details: {
    //       name: user.name,
    //       email: user.email,
    //       address: {
    //         line1: address.address,
    //         city: address.city,
    //         state: address.state,
    //         postal_code: address.pincode,
    //         country: address.country,
    //       },
    //     },
    //   },
    // });
    // if (result.error) {
    //   toast.error(result.error.message);
    // } else {
    //   if (result.paymentIntent.status === "succeeded") {
    //     navigate("/payment/Success");
    //   } else {
    //     toast.error("There is some issue with the payment");
    //   }
    // }
  };
  return (
    <div>
      <form action="" onSubmit={handlePayment}>
        <CardNumberElement />
        <CardExpiryElement />
        <CardCvcElement />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Payment;
