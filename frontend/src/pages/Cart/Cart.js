import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleCartItem from "../../components/SingleCartItem/SingleCartItem";
import { useNavigate } from "react-router-dom";
import "./cart.css";
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const Amount = {
    price: 0,
    gst: 0,
    totalprice: 0,
  };
  cart.cart.forEach((event) => {
    Amount.price += event.Product.price * event.itemCount;
  });
  Amount.gst = Amount.price * 0.18;
  Amount.totalprice = Amount.price + Amount.gst;
  const navigate = useNavigate();
  return (
    <>
      <div className="cart_section">
        <h3>Cart</h3>
        <div className="cart_section_wrapper">
          <div className="cart_wrapper">
            <div className="index">
              <div className="product">Product</div>
              <div>Quantity</div>
              <div>Price</div>
            </div>
            <span></span>
            {cart.cart.map(({ Product, itemCount }) => {
              return (
                <>
                  {console.log("Product._id", Product._id)}
                  <SingleCartItem
                    key={Product._id}
                    Product={Product}
                    itemCount={itemCount}
                  />
                  <span></span>
                </>
              );
            })}
          </div>
          <div className="confirm_order">
            <div className="price_section">
              <div className="price_flex">
                <strong>total</strong>
                <p>₹{Amount.price}</p>
              </div>
              <div className="price_flex">
                <strong>gst</strong>
                <p>₹{Amount.gst}</p>
              </div>
            </div>
            <div className="order_now_section">
              <hr />
              <div className="price_flex">
                <strong>Grand Total</strong>
                <p>₹{Amount.totalprice}</p>
              </div>
              <button
                onClick={() => {
                  navigate("/Process/Orders");
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
