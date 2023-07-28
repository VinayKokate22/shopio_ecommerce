import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/productdetails/ProductDetails";
import AllProducts from "./pages/allproducts/AllProducts";
import Login from "./pages/login/Login";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Search from "./pages/search/Search";
import Register from "./pages/register/Register";
import Account from "./pages/Account/Account";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
// import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductEdit from "./components/ProductEdit/ProductEdit";
import { useSelector } from "react-redux";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setstripeApiKey] = useState(null);
  const user = useSelector((state) => state.user);
  console.log("the user is", user);
  useEffect(() => {
    // const getStripeApikey = async () => {
    //   try {
    //     const res = await axios.get("/api/v1/sendhi");
    //     console.log("send hi", res);
    //     const { data } = await axios.get("/api/v1/payment/stripeapikey");
    //     console.log("stripeApiKey", data.stripeApiKey);
    //     setstripeApiKey(data.stripeApiKey);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getStripeApikey();
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<AllProducts />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/Account"
          element={user?.User ? <Account /> : <Login />}
        />
        <Route exact path="/Cart" element={<Cart />} />
        <Route
          exact
          path="/Dashboard"
          element={
            user?.User && user?.User.role === "admin" ? (
              <Dashboard />
            ) : (
              <Login />
            )
          }
        />
        <Route
          exact
          path="/Dashboard/ProductEdit/:id"
          element={
            user?.User && user?.User.role === "admin" ? (
              <ProductEdit />
            ) : (
              <Login />
            )
          }
        />

        <Route
          exact
          path="/Process/Orders"
          element={
            user?.User ? <Orders stripeApiKey={stripeApiKey} /> : <Login />
          }
        ></Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
