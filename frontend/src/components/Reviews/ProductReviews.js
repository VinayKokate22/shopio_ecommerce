import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateproductdata } from "../../store/slices/ProductDetailsSlice";
import "./productreviews.css";

const ProductReviews = ({ product }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [Comment, setComment] = useState("");
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const data = { rating: value, comment: Comment, productId: product._id };
      const res = await axios.put("/api/v1/review", data);
      dispatch(updateproductdata(res.data.product));
      console.log(res.data);
      if (res.data.success) {
        toast.success("Review Sumbmitted");
      }
      setValue(0);
      setComment("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="Product_write_review">
        <h3>Write Your Review</h3>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <form action="" onSubmit={handleSumbit}>
          <textarea
            required
            name="Description"
            placeholder="Product Description"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={Comment}
            cols="30"
            rows="3"
          ></textarea>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;
