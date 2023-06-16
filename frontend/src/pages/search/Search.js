import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatedata } from "../../store/slices/ProductSlice";
import { useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

import ProductCard from "../../components/cards/ProductCard";
const Search = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [productCount, setProductCount] = useState(null);
  const [productCount_paging, setProductCount_paging] = useState(null);
  const query = useLocation().search;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const url = `/api/v1/product${query}&page=${page}`;
  useEffect(() => {
    const getAlldata = async () => {
      const response = await axios.get(url);
      const data = response.data;
      setProductCount(data.productCount);
      setProductCount_paging(data.resultPerPage);

      console.log("the data form search is  ", data);

      dispatch(updatedata(data));
    };
    getAlldata();
  }, [url, dispatch]);
  const pageCount = Math.floor(productCount / productCount_paging);
  return (
    <div className="Product_section">
      <div className="Container">
        <ProductCard />
      </div>
      {productCount_paging && (
        <Pagination count={pageCount + 1} page={page} onChange={handleChange} />
      )}
    </div>
  );
};

export default Search;
