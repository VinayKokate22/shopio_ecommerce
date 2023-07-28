import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateproductdata } from "../../store/slices/ProductDetailsSlice";
import ReactStar from "react-rating-stars-component";
import Loading from "../../components/loading/Loading";
import { updatecart } from "../../store/slices/CartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import "./productdetail.css";
import { Button, Zoom } from "@mui/material";
import Rating from "@mui/material/Rating";

import { toast } from "react-toastify";
import ProductReviews from "../../components/Reviews/ProductReviews";

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
  const [Reviews, setReviews] = useState(false);
  const [revdel, setrevdel] = useState(false);
  const [isdeleting, setisdeleting] = useState(false);
  const data = useSelector((state) => state.productdetail);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const url = `/api/v1/${location.pathname}`;
  const handleownreviewdelete = async (productid, reviewid) => {
    try {
      setisdeleting(true);
      const res = await axios.delete(
        `/api/v1/reviews/${productid}?id=${reviewid}`
      );
      setrevdel(!revdel);
      toast.success("Review Deleted");

      console.log("success");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    const productdetails = async () => {
      const response = await axios.get(url);
      console.log(response.data.product);
      dispatch(updateproductdata(response.data.product));
      setisdeleting(false);
    };
    console.log(111);

    productdetails();
  }, [url, dispatch, revdel]);
  useEffect(() => {
    const myorder = async () => {
      if (user.User && data?.action?.payload) {
        try {
          const res = await axios.get("/api/v1/order/me");
          console.log("res.data", res.data);
          // console.log("data.action.payload._id", data.action.payload._id);
          let exist = false;
          res?.data?.orders?.forEach((e) => {
            e.orderItem.forEach((event) => {
              if (event.product === data.action.payload?._id) {
                exist = true;
              }
            });
            console.log("exist", exist);

            if (e.orderStatus === "Delivered" && exist) {
              setReviews(true);
            } else {
              setReviews(false);
            }
          });
        } catch (error) {
          toast.error(error.message);
        }
      }
    };
    myorder();
  }, [user, data]);
  const [MainImage, setMainImage] = useState("");
  if (!data.action) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (data.action.payload?._id !== url.split("/").pop()) {
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
            <p style={{ color: "red" }}>Out of Stock</p>
          ) : (
            <p>Last {data.action.payload.stock} left - make it yours</p>
          )}
          {data.action.payload.category === "cloths" && (
            <div className="dummy_size">
              <ul>
                <li>L</li>
                <li>M</li>
                <li>S</li>
                <li>XS</li>
              </ul>
            </div>
          )}

          <div className="item_count_button_wrapper">
            <button
              disabled={itemCount === 1 || data.action.payload.stock == 0}
              onClick={() => setitemCount(itemCount - 1)}
            >
              -
            </button>
            <p>{itemCount}</p>
            <button
              disabled={
                itemCount === data.action.payload.stock ||
                data.action.payload.stock == 0
              }
              onClick={() => setitemCount(itemCount + 1)}
            >
              +
            </button>
          </div>
          {!data.action.payload.stock == 0 && (
            <button
              disabled={data.action.payload.stock == 0}
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
          )}
        </div>
      </div>

      {console.log("Reviews", Reviews)}
      {Reviews && <ProductReviews product={data.action.payload} />}
      <div className="product_allreviews">
        <h3>All Reviews</h3>
        {data.action.payload.reviews.map((e, i) => {
          return (
            <div className="product_singlereview_section">
              <div className="product_singlereview" key={i}>
                {/* <p>{e.user}</p> */}
                <div>
                  <p id="username">{e.name}</p>
                  <Rating name="read-only" value={e.rating} readOnly />
                </div>

                <p id="comment">Review : {e.comment}</p>
              </div>
              {e.user === user.User?._id && (
                <Button
                  style={isdeleting ? { cursor: "not-allowed" } : null}
                  // disabled={isdeleting}
                  onClick={() => {
                    handleownreviewdelete(data.action.payload._id, e._id);
                  }}
                >
                  <DeleteIcon />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetails;
