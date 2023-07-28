import React from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../../store/slices/CartSlice";
const Payment = ({ address, Amount, stripeApiKey }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);
  const orderItems = cart?.map((e) => {
    return {
      name: e.Product.name,
      price: e.Product.price,
      quantity: e.itemCount,
      image: e.Product.image[0].url,
      product: e.Product._id,
    };
  });
  const shippingInfo = {
    address: address.address,
    city: address.city,
    country: address.country,
    pinCode: address.pincode,
    phoneNo: address.phone,
  };
  console.log("orderItems", orderItems);
  console.log("address", address);
  const data = {
    shippingInfo: shippingInfo,
    orderItem: orderItems,
    paymentInfo: {
      id: "343243214",
      status: "paid",
    },
    itemPrice: Amount.price,
    taxPrice: Amount.gst,
    shippingPrice: 50,
    totalPrice: Amount.totalprice,
  };
  // const stripe = useStripe();
  // const elements = useElements();
  console.log(data);
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/order/new", data);
      console.log("payment", res.data);
      dispatch(clearCart());
    } catch (error) {
      toast.error(error.message);
    }
    // console.log("stripeApiKey", stripeApiKey);
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
        {/* <CardNumberElement />
        <CardExpiryElement />
        <CardCvcElement /> */}
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Payment;
