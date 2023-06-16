import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "axios";
import { toast } from "react-toastify";
import AllProducts from "../../pages/allproducts/AllProducts";
import Loading from "../loading/Loading";
const ProductEdit = () => {
  const product = useSelector((state) => state.productdetail?.action?.payload);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading, setloading] = useState(false);
  const [Product, setProduct] = useState({
    name: product?.name,
    price: product?.price,
    description: product?.description,
    category: product?.category,
    stock: product?.stock,
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
  const MainImage = product?.image[0].url;
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
      setloading(true);
      console.log(Product);
      const res = await axios.put(
        `/api/v1/admin/product/${product._id}`,
        Product
      );
      toast.success("Product has been Updated");
      setloading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="productedit_page">
      {!product ? (
        <Loading />
      ) : (
        <div className="productedit_section">
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
                placeholder={product?.name}
                required
                defaultValue={product?.name}
                //   value={Product.name}
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
                placeholder={product.price}
                defaultValue={product.price}
                required
                // disabled={Product.price  0}
                //   value={Product.price}
                onChange={(e) => {
                  setProduct({ ...Product, price: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Description</label>
              <textarea
                required
                name="Description"
                placeholder="Product Description"
                //   value={Product.description}
                defaultValue={product?.description}
                onChange={(e) => {
                  setProduct({ ...Product, description: e.target.value });
                }}
                cols="30"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label htmlFor="">Category</label>{" "}
              <select
                onChange={(e) => {
                  setProduct({ ...Product, category: e.target.value });
                }}
              >
                <option value="">{product.category}</option>
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
                defaultValue={product.stock}
                onChange={(e) => {
                  setProduct({ ...Product, stock: e.target.value });
                }}
              />
            </div>
            <div className="oldimage_edit">
              <img
                style={{
                  width: "4rem",
                  height: "4rem",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
                src={product.image[0].url}
                alt=""
              />
              <img
                style={{
                  width: "4rem",
                  height: "4rem",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
                src={product.image[1]?.url}
                alt=""
              />
              <img
                style={{
                  width: "4rem",
                  height: "4rem",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
                src={product.image[2]?.url}
                alt=""
              />
              <img
                style={{
                  width: "4rem",
                  height: "4rem",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
                src={product.image[3]?.url}
                alt=""
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                required
                //   defaultValue={product.image[0].url}
                onChange={createProductImagesChange}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                required
                onChange={createProductImagesChange}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                required
                onChange={createProductImagesChange}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                required
                onChange={createProductImagesChange}
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
              disabled={loading ? true : false}
              style={loading ? { backgroundColor: "darkgray" } : null}
            >
              Update
            </button>
          </form>
          <div className="product_detail_section">
            <h2>Demo</h2>
            <div className="product_detail_wrapper">
              <div className="image_component">
                <div className="main_image">
                  <img
                    src={MainImage ? MainImage : Product.image[0].url}
                    alt="fg"
                  />
                </div>
                <div className="Extra_image">
                  <img
                    className=""
                    src={
                      product.image[1]?.url
                        ? product.image[1]?.url
                        : product.image[0]?.url
                    }
                    alt="fg"
                  />
                  <img
                    className=""
                    src={
                      product.image[2]?.url
                        ? product.image[2]?.url
                        : product.image[0]?.url
                    }
                    alt="fg"
                  />
                  <img
                    className=""
                    src={
                      product.image[3]?.url
                        ? product.image[3]?.url
                        : product.image[0]?.url
                    }
                    alt="fg"
                  />
                  <img className="" src={product.image[0]?.url} alt="fg" />
                </div>
              </div>
              <div className="product_info">
                <h2>{Product.name}</h2>
                <p>{Product.description}</p>

                <span>Price ₹{Product.price}</span>
                {Product.stock === 0 ? (
                  <p>Out of Stock</p>
                ) : (
                  <p>Last {Product.stock} left - make it yours</p>
                )}

                <div className="item_count_button_wrapper">
                  <button>-</button>
                  <p>{Product.stock}</p>
                  <button>+</button>
                </div>
                <button className="addtocart">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEdit;
