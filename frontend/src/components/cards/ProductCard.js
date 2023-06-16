import React from "react";
import ReactStar from "react-rating-stars-component";
import "./productcard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "#000000",
  size: window.innerWidth < 600 ? 15 : 20,
  value: 2.5,
  isHalf: true,
};

const ProductCard = () => {
  const navigate = useNavigate();
  const handleselectedProduct = (id) => {
    navigate(`/product/${id}`);
  };
  const data = useSelector((state) => {
    return state.product;
  });
  console.log(data);
  // console.log(data.loading);

  return (
    <>
      {data.loading || data.error ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {data.product.map((product) => {
            // if (product._id === window)
            return (
              <div key={product._id} className="product_card">
                <div className="product_card_image">
                  <img
                    src={product.image[0].url}
                    alt="fg"
                    onClick={() => handleselectedProduct(product._id)}
                  />
                </div>

                <div className="Product_short_info">
                  <div className="reactstar">
                    <p>{product.name}</p>
                    <div className="rating">
                      <ReactStar
                        classNames={"stars"}
                        {...options}
                        value={product.rating}
                      />
                      <p style={{ display: "inline" }}>
                        ({product.reviews.length})
                      </p>
                    </div>
                  </div>
                  <div className="Rightarrow_wrapper">
                    <span>₹ {product.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default ProductCard;
