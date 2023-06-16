import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCount } from "../../store/slices/CartSlice";
import { useNavigate } from "react-router-dom";

const SingleCartItem = ({ Product, itemCount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Count, setCount] = useState(itemCount);
  useEffect(() => {
    const newProduct = { Product, itemCount: Count };
    console.log("Count", Count);
    console.log("newProduct", newProduct);

    dispatch(updateCount(newProduct));
  }, [Count]);
  //   const handleChange = () => {
  //     const newProduct = { Product, itemCount: Count };
  //     console.log("Count", Count);
  //     console.log("newProduct", newProduct);
  //     dispatch(updateCount(newProduct));
  //   };
  return (
    <div className="single_cart_item_wrapper">
      <div className="single_cart_info">
        <div className="img_wrapper">
          <img
            onClick={() => {
              navigate(`/product/${Product._id}`);
            }}
            src={Product.image[0].url}
            alt=""
          />
        </div>
        <div>
          <p>{Product.name}</p>
        </div>
      </div>
      <div className="button_container">
        <div className="ItemCount_button">
          <button
            disabled={Count === 1}
            onClick={async () => {
              setCount(Count - 1);
              //   handleChange();
            }}
          >
            -
          </button>
          <button>{Count}</button>
          <button
            disabled={Count === Product.stock}
            onClick={() => {
              setCount(Count + 1);
              //   handleChange();
            }}
          >
            +
          </button>
        </div>
        <div className="delete_button">
          <button>delete</button>
        </div>
      </div>

      <div>
        <p>{Product.price}</p>
      </div>
    </div>
  );
};

export default SingleCartItem;
