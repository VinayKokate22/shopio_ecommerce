import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setstripeApiKey] = useState(null);

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
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={AllProducts} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/Account" Component={Account} />
        <Route exact path="/Cart" Component={Cart} />
        <Route exact path="/Dashboard" Component={Dashboard} />
        <Route
          exact
          path="/Dashboard/ProductEdit/:id"
          Component={ProductEdit}
        />

        <Route
          exact
          path="/Process/Orders"
          element={<Orders stripeApiKey={stripeApiKey} />}
        ></Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
