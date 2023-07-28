import { Step, StepLabel, Stepper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ConformOrder from "../../components/ConformOrder/ConformOrder";
import Payment from "../../components/Payment/Payment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const steps = ["Shipping Address", "Create an ad group", "Create an ad"];
const Orders = ({ stripeApiKey }) => {
  const [activeStep, setActiveStep] = useState(1);
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
  console.log("Amount", Amount);
  const initialState = {
    address: null,
    city: null,
    pincode: null,
    phone: null,
    country: null,
    state: "Delhi",
  };
  const [form, setform] = useState(initialState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setform((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      form.pincode === null ||
      form.pincode.toString().length !== 6 ||
      form.phone === null ||
      form.phone.toString().length !== 10
    ) {
      // Handle errors or display error messages
      toast.error("Invalid Input Fields");
      return; // Prevent form submission
    }
    setActiveStep((prevalue) => prevalue + 1);
  };
  useEffect(() => {
    console.log("the form data", form);
  }, [form]);
  return (
    <>
      <Stepper activeStep={activeStep - 1}>
        {steps.map((label, i) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 1 && (
        // Render component or content for 1
        <form style={{ width: "30%", margin: "auto" }} onSubmit={handleSubmit}>
          <fieldset
            className=""
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              id="address"
              name="address"
              label="Address"
              variant="outlined"
              required
              value={form.address}
              onChange={handleChange}
            />
            <TextField
              id="city"
              name="city"
              label="City"
              variant="outlined"
              required
              value={form.city}
              onChange={handleChange}
            />
            <TextField
              id="pincode"
              type="number"
              name="pincode"
              label="Pincode"
              variant="outlined"
              required
              value={form.pincode}
              error={
                form.pincode !== null && form.pincode?.toString().length !== 6
              }
              onChange={handleChange}
            />
            <TextField
              id="phone"
              name="phone"
              type="number"
              label="Phone"
              variant="outlined"
              required
              error={
                form.phone !== null && form.phone?.toString().length !== 10
              }
              value={form.phone}
              onChange={handleChange}
            />
            <TextField
              id="country"
              name="country"
              label="Country"
              variant="outlined"
              required
              value={form.country}
              onChange={handleChange}
            />
            <button type="submit">Next</button>
          </fieldset>
        </form>
      )}

      {activeStep === 2 && (
        // Render component or content for 2
        <ConformOrder Amount={Amount} setActiveStep={setActiveStep} />
      )}

      {activeStep === 3 && (
        // Render component or content for 3
        <Payment stripeApiKey={stripeApiKey} Amount={Amount} address={form} />
      )}

      <button
        disabled={activeStep === 1}
        onClick={() => {
          setActiveStep(activeStep - 1);
        }}
      >
        back
      </button>
    </>
  );
};

export default Orders;
