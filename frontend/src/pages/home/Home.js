import React, { useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/cards/ProductCard";

import { useDispatch } from "react-redux";
import {
  updatedata,
  updatedata_error,
  updatedata_loading,
} from "../../store/slices/ProductSlice";
import "./home.css";
import { Button } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const url = "/api/v1/product";
    const getAlldata = async () => {
      try {
        dispatch(updatedata_loading());
        const response = await axios.get(url);
        const data = response.data;
        dispatch(updatedata(data));
      } catch (error) {
        dispatch(updatedata_error());
      }
    };
    getAlldata();
  }, [dispatch]);

  return (
    <div className="hero_page">
      <div className="hero_section">
        <div className="overlay"></div>
        <div className="overlay_div">
          <h1>Your One-Stop Shopping Destination</h1>
          <Button className="button" variant="contained">
            Shop Now
          </Button>
        </div>
      </div>
      <div className="Product_section">
        <h2>Feauterd Product</h2>
        <div className="Container">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
