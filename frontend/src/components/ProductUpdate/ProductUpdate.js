import React, { useEffect, useState } from "react";

import "./productupdate.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import {
  updatedata,
  updatedata_error,
  updatedata_loading,
} from "../../store/slices/ProductSlice";
import { updateproductdata } from "../../store/slices/ProductDetailsSlice";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [productCount_paging, setProductCount_paging] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [Delete, setDelete] = useState(false);
  const query = new URLSearchParams(location.search);
  const handleselectedProduct = (id) => {
    navigate(`/product/${id}`);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const data = useSelector((state) => {
    return state.product;
  });
  console.log(data);
  // console.log(data.loading);
  const url = `/api/v1/product${query ? `?${query}` : "?"}&page=${page}`;
  console.log("the url is", url);

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/admin/product/${id}`);
      toast.success(res.message);
      toast.success("Product is deleted");
      setDelete(!Delete);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    console.log("query is ", query);
    const getAlldata = async () => {
      try {
        dispatch(updatedata_loading());
        const response = await axios.get(url);
        const data = response.data;
        setProductCount(data.productCount);
        setProductCount_paging(() => {
          if (data.product.length < data.resultPerPage) {
            if (page == 1) {
              return data.productCount + 1;
            } else {
              return data.resultPerPage;
            }
          } else {
            return data.resultPerPage;
          }
        });
        // console.log("the data is ", data);
        dispatch(updatedata(data));
      } catch (error) {
        dispatch(updatedata_error());
      }
    };
    getAlldata();
  }, [url, dispatch, Delete]);
  const pageCount = Math.floor(productCount / productCount_paging);
  return (
    <>
      {data.loading || data.error ? (
        <>
          <Loading />
        </>
      ) : (
        <div>
          <br />
          <div className="index">
            <div className="product">Product</div>
            <div>Stock</div>
            <div>Price</div>
            <div>Edit/Remove</div>
          </div>
          {data.product.map((product) => {
            // if (product._id === window)
            return (
              <div>
                <hr className="horizontal_line"></hr>
                <div key={product._id} className="product_smallcard">
                  <div className="product_card_image">
                    <img
                      src={product.image[0].url}
                      alt="fg"
                      onClick={() => handleselectedProduct(product._id)}
                    />
                  </div>
                  <div className="Product_short_info">
                    <div className="reactstar">
                      <p>Product Name : {product.name}</p>
                      <p>Product ID : {product._id}</p>
                    </div>
                    <div>{product.stock}</div>
                    <div className="right_section">
                      <span>₹ {product.price}</span>
                    </div>
                    <div className="buttons">
                      <button
                        onClick={() => {
                          console.log("god help me ");
                          dispatch(updateproductdata(product));
                          navigate(`ProductEdit/${product._id}`);
                        }}
                      >
                        <EditRoundedIcon />
                      </button>
                      <button onClick={() => handleDeleteProduct(product._id)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <Pagination
            count={pageCount + 1}
            page={page}
            onChange={handleChange}
            className="pagination"
          />
        </div>
      )}
    </>
  );
};

export default ProductUpdate;
