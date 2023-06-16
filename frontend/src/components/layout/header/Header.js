import React, { useEffect, useState } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Userloading, Usersuccessfull } from "../../../store/slices/UserSlice";
import axios from "axios";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { toast } from "react-toastify";
import { Backdrop, Badge } from "@mui/material";
import {
  clearCart,
  fetchCart,
  updatecart,
} from "../../../store/slices/CartSlice";
const Header = () => {
  const handleLogout = async () => {
    try {
      toast.info("Loading...", { toastId: "loadingToast" });
      const res = await axios.get("/api/v1/logout");
      if (res.data) {
        localStorage.clear();
        dispatch(clearCart());
        dispatch(Userloading());
        toast.dismiss("loadingToast");

        console.log("console.log(1)");
        // if (!toast.isActive("successToast")) {
        toast.success("Logout Successful", {
          toastId: "successToast",
          hideProgressBar: true,
          // });
        });
      }
      console.log(res.data);
    } catch (error) {
      toast.dismiss("loadingToast");
      toast.error(error.response.data.message, {
        toastId: "errorToast",
      });
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Search, setSearch] = useState("");
  const data = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  console.log("the cart is ", cart);
  const actions = [
    ...(data.User?.role === "admin"
      ? [
          {
            icon: <SpaceDashboardIcon />,
            name: "Dashboard",
            link: "Dashboard",
          },
          { icon: <AccountCircleIcon />, name: "Account", link: "Account" },
        ]
      : [{ icon: <AccountCircleIcon />, name: "Account", link: "Account" }]),
    { icon: <ListAltIcon />, name: "Orders", link: "Process/Orders" },
    { icon: <LogoutIcon />, name: "Logout", link: "Logout" },
  ];
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?keyword=${Search}`);
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInUserCart = localStorage.getItem("cart");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(Usersuccessfull(foundUser));
      if (loggedInUserCart) {
        const foundCart = JSON.parse(loggedInUserCart);
        console.log("foundCart is", foundCart);
        dispatch(fetchCart(foundCart));
      }
    }
  }, []);
  useEffect(() => {
    if (cart.cart.length !== 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  return (
    <>
      <div className="navbar">
        <div className="navbar_leftsection">
          <span onClick={() => navigate(`/`)}>SHöPIö</span>
        </div>
        <div className="navbar_middlesection">
          <ul>
            <li onClick={() => navigate(`/products`)}>product</li>
            <li>contact</li>
            <li>about</li>
          </ul>
        </div>
        <div className="navbar_rightsection">
          <div className="icon_links">
            <ul>
              <li>
                <form action="" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search ..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </li>

              <li
                onClick={() => {
                  navigate(`/cart`);
                }}
                className="shoppingcart"
              >
                <Badge badgeContent={cart.CartCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </li>

              {console.log("the user data from userslice", data)}
              {data.User ? (
                <>
                  <Backdrop open={open} />
                  <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    className="SpeedDialIcon"
                    icon={
                      <img
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "30%",
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                        src="https://media.thereformation.com/image/upload/f_auto,q_auto,dpr_2.0//PRD-SFCC/1310993/ECO_BEIGE/1310993.1.ECO_BEIGE?_s=RAABAB0"
                      ></img>
                    }
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    FabProps={{
                      sx: {
                        bgcolor: "gray",
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "50%",
                        boxShadow: "null",
                        border: "null",
                        "&:hover": {
                          bgcolor: "gray",
                        },
                      },
                    }}
                    direction="down"
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => {
                          if (action.name === "Logout") {
                            handleLogout();
                            navigate("/");
                          } else {
                            navigate(action.link);
                          }

                          handleClose();
                        }}
                      />
                    ))}
                  </SpeedDial>
                </>
              ) : (
                <>
                  <li onClick={() => navigate(`/login`)}>Login</li>
                  <li onClick={() => navigate(`/register`)}>Register</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
