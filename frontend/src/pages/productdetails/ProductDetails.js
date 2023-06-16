import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateproductdata } from "../../store/slices/ProductDetailsSlice";
import ReactStar from "react-rating-stars-component";
import Loading from "../../components/loading/Loading";
import { updatecart } from "../../store/slices/CartSlice";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import "./productdetail.css";
const ProductDetails = () => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "rgba(0,0,0,1)",
    size: window.innerWidth < 600 ? 20 : 25,
    value: 0,
    isHalf: true,
  };

  const [itemCount, setitemCount] = useState(1);
  const data = useSelector((state) => state.productdetail);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const location = useLocation();
  const url = `/api/v1/${location.pathname}`;

  useEffect(() => {
    const productdetails = async () => {
      const response = await axios.get(url);
      console.log(response.data.product);
      dispatch(updateproductdata(response.data.product));
    };
    productdetails();
  }, [url, dispatch]);
  const [MainImage, setMainImage] = useState("");
  if (!data.action) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (data.action.payload._id !== url.split("/").pop()) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="product_detail_section">
      <div className="product_detail_wrapper">
        <div className="image_component">
          <div className="main_image">
            <img
              src={MainImage ? MainImage : data.action.payload.image[0].url}
              alt="fg"
            />
          </div>
          <div className="Extra_image">
            <img
              onClick={(e) => {
                setMainImage(e.target.src);
              }}
              className=""
              src={
                data.action.payload.image[1]?.url
                  ? data.action.payload.image[1]?.url
                  : data.action.payload.image[0]?.url
              }
              alt="fg"
            />
            <img
              onClick={(e) => {
                setMainImage(e.target.src);
              }}
              className=""
              src={
                data.action.payload.image[2]?.url
                  ? data.action.payload.image[2]?.url
                  : data.action.payload.image[0]?.url
              }
              alt="fg"
            />
            <img
              onClick={(e) => {
                setMainImage(e.target.src);
              }}
              className=""
              src={
                data.action.payload.image[3]?.url
                  ? data.action.payload.image[3]?.url
                  : data.action.payload.image[0]?.url
              }
              alt="fg"
            />
            <img
              onClick={(e) => {
                setMainImage(e.target.src);
              }}
              className=""
              src={data.action.payload.image[0]?.url}
              alt="fg"
            />
          </div>
        </div>
        <div className="product_info">
          <h2>{data.action.payload.name}</h2>
          <p>{data.action.payload.description}</p>

          <div>
            <ReactStar {...options} value={data.action.payload.rating} />
          </div>

          <span>Price ₹{data.action.payload.price}</span>
          {data.action.payload.stock === 0 ? (
            <p>Out of Stock</p>
          ) : (
            <p>Last {data.action.payload.stock} left - make it yours</p>
          )}

          <div className="dummy_size">
            <ul>
              <li>L</li>
              <li>M</li>
              <li>S</li>
              <li>XS</li>
            </ul>
          </div>
          <div className="item_count_button_wrapper">
            <button
              disabled={itemCount === 1}
              onClick={() => setitemCount(itemCount - 1)}
            >
              -
            </button>
            <p>{itemCount}</p>
            <button
              disabled={itemCount === data.action.payload.stock}
              onClick={() => setitemCount(itemCount + 1)}
            >
              +
            </button>
          </div>
          <button
            className="addtocart"
            onClick={() => {
              if (data) {
                console.log("this is dispatch(updateCart)", {
                  Product: data.action.payload,
                  itemCount,
                });
                dispatch(
                  updatecart({ Product: data.action.payload, itemCount })
                );
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
