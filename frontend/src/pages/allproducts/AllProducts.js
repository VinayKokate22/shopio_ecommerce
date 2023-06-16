import React, { useEffect, useState } from "react";
import ProductCard from "../../components/cards/ProductCard";
import { useDispatch } from "react-redux";
import {
  updatedata,
  updatedata_error,
  updatedata_loading,
} from "../../store/slices/ProductSlice";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import "./allproducts.css";
import { Button } from "@mui/material";
const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const price = [0, 200000];
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [page, setPage] = useState(1);
  const [Cat, setCat] = useState(null);
  const [range, setrange] = useState(price[1]);
  const [dummy_range, setdummy_range] = useState(price[1]);
  const [Rating, setRating] = useState(0);
  const [Dummy_Rating, setDummy_Rating] = useState(0);
  const [productCount_paging, setProductCount_paging] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const categories = [
    {
      url: "https://i.pinimg.com/564x/c3/f3/7b/c3f37b3aee184ecaea8ad1ea324dad01.jpg",
      name: "cloths",
    },
    {
      url: "https://i.pinimg.com/564x/ea/a2/e2/eaa2e28cb6f3ea8704e952f4ef477425.jpg",
      name: "Electronics",
    },
    {
      url: "https://i.pinimg.com/736x/5c/00/d3/5c00d32f76f582fd7a61545363b417b5.jpg",
      name: "Kitchen",
    },
    {
      url: "https://i.pinimg.com/736x/41/af/91/41af91c63ea6b64291be79457e4cf656.jpg",
      name: "Decor",
    },
    {
      url: "https://i.pinimg.com/564x/42/c1/57/42c157f909845062343617736ee60099.jpg",
      name: "Stationary",
    },
    {
      url: "https://i.pinimg.com/564x/21/4d/78/214d787685a4ba54fff8cf278517b79f.jpg",
      name: "Beauty",
    },
  ];
  // const settheurl = (action) => {
  //   if (action === "decrease") {
  //     setPage((page) => page - 1);
  //   } else if (action === "first") {
  //     setPage(1);
  //   } else {
  //     setPage((page) => page + 1);
  //   }
  // };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleFilter = () => {
    setrange(dummy_range);
    setPage(1);
    setRating(Dummy_Rating);
  };

  const url = `/api/v1/product${
    query ? `?${query}` : "?"
  }&page=${page}&price[gte]=${price[0]}&price[lte]=${range}${
    Cat ? `&category=${Cat}` : ""
  }&rating[gte]=${Rating}`;
  console.log("the url is", url);

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
  }, [url, dispatch]);
  const pageCount = Math.floor(productCount / productCount_paging);
  return (
    <div className="Product_page">
      <div className="Product_section">
        <h3 className="Category_title">Category</h3>
        <div className="category_wrapper">
          {categories.map((cat) => {
            return (
              <div
                className="singleCat_wrapper"
                style={{ cursor: "pointer" }}
                key={cat.name}
                onClick={() => {
                  if (!query.get("keyword")) {
                    setCat(cat.name);
                  } else {
                    navigate("/products");
                    setCat(cat.name);
                  }
                }}
              >
                <img src={cat.url} alt="" />
                <div className="overlay">
                  <Button
                    style={
                      Cat === cat.name ? { backgroundColor: "#e1e1e1" } : null
                    }
                    variant="contained"
                  >
                    Shop {cat.name}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="set_filter_wrapper">
          <div className="single_filter_component">
            <p>
              Price Below : <span>{dummy_range}</span>
            </p>
            <input
              type="range"
              className="price_filter"
              id="volume"
              name="volume"
              min={price[0]}
              max={price[1]}
              value={dummy_range}
              onChange={(e) => setdummy_range(e.target.value)}
            ></input>
          </div>
          <div className="single_filter_component">
            <p>
              Rating Above <span>{Dummy_Rating}</span>
            </p>
            <input
              className="rating_filter"
              type="range"
              id="volume"
              name="volume"
              min={0}
              max={5}
              value={Dummy_Rating}
              onChange={(e) => setDummy_Rating(e.target.value)}
            ></input>
          </div>
        </div>
        <Button
          className="setfilter"
          variant="contained"
          onClick={handleFilter}
        >
          Apply Filter
        </Button>
        <h3>Products</h3>
        <div className="Container">
          <ProductCard />
        </div>
        {/* <button onClick={() => settheurl("first")} disabled={page === 1}>
        First
      </button>
      <button onClick={() => settheurl("decrease")} disabled={page === 1}>
        Before
      </button>
      <button
        onClick={() => settheurl("add")}
        disabled={productCount_paging === 0}
      >
        Next
      </button> */}
        {console.log(pageCount + 1)}
        {console.log("productCount_paging", productCount_paging)}

        {productCount_paging && (
          <Pagination
            count={pageCount + 1}
            page={page}
            onChange={handleChange}
            className="pagination"
          />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
