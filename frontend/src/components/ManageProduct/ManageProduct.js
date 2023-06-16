import React, { useState } from "react";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "axios";
import { toast } from "react-toastify";
import AllProducts from "../../pages/allproducts/AllProducts";
import "./manageproduct.css";
import ProductUpdate from "../ProductUpdate/ProductUpdate";
const ManageProduct = () => {
  const [index, setindex] = useState(0);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [Product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
    image: [],
  });
  const categories = [
    "cloths",
    "Electronics",
    "Kitchen",
    "Decor",
    "Stationary",
    "Beauty",
  ];
  const option = ["Create Product", "Update Product"];
  const createProductImagesChange = async (e) => {
    try {
      const profileimage = e.target.files[0];
      const formdata = new FormData();
      formdata.append("file", profileimage);
      formdata.append("cloud_name", "dbwuelrnu");
      formdata.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

      const axiosInstance = axios.create({
        baseURL: "https://api.cloudinary.com/v1_1/dbwuelrnu",
      });

      // ...

      const res = await axiosInstance.post("/image/upload", formdata);
      console.log(res);
      const imageUrl = res.data.url;
      toast(imageUrl);
      setProduct({
        ...Product,
        image: [
          ...Product.image,
          {
            public_id: "productimage",
            url: imageUrl,
          },
        ],
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const createProductSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(Product);
      const res = await axios.post("/api/v1/product/new", Product);
      console.log("created product", res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className="dashboard_option">
        <ul>
          {option.map((component, i) => {
            return (
              <li
                style={index === i ? { backgroundColor: "#e1e1e1" } : null}
                onClick={() => setindex(i)}
              >
                {component}
              </li>
            );
          })}
        </ul>
      </div>
      {index === 0 && (
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <div>
            <label htmlFor="">Product Name</label>
            <input
              name="product"
              type="text"
              placeholder="Product Name"
              required
              value={Product.name}
              onChange={(e) => {
                setProduct({ ...Product, name: e.target.value });
              }}
            />
          </div>
          <div>
            <label htmlFor="">Price</label>{" "}
            <input
              name="Price"
              type="number"
              placeholder="Price"
              required
              onChange={(e) => {
                setProduct({ ...Product, price: e.target.value });
              }}
            />
          </div>

          <div>
            <label htmlFor="">Description</label>
            <textarea
              name="Description"
              placeholder="Product Description"
              value={Product.description}
              onChange={(e) => {
                setProduct({ ...Product, description: e.target.value });
              }}
              cols="30"
              required
              rows="3"
            ></textarea>
          </div>

          <div>
            <label htmlFor="">Category</label>{" "}
            <select
              required
              onChange={(e) => {
                setProduct({ ...Product, category: e.target.value });
              }}
            >
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="">Stock</label>{" "}
            <input
              name="stock"
              type="number"
              placeholder="Stock"
              required
              min={1}
              onChange={(e) => {
                setProduct({ ...Product, stock: e.target.value });
              }}
            />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              required
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
            />
          </div>
          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              required
            />
          </div>
          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              required
            />
          </div>
          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              required
            />
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>

          <button
            id="createProductBtn"
            type="submit"
            disabled={false ? true : false}
          >
            Create
          </button>
        </form>
      )}
      {index === 1 && <ProductUpdate />}
    </div>
  );
};

export default ManageProduct;
