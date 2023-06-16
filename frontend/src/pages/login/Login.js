import React, { useState } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import { useDispatch } from "react-redux";
import {
  Usererror,
  Userloading,
  Usersuccessfull,
} from "../../store/slices/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const url = "/api/v1/login";
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const config = { headers: { "Content-Type": "application/json" } };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(Userloading());
      toast.info("Loading...", { toastId: "loadingToast" });

      const response = await axios.post(url, { email, password }, config);
      if (response) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(Usersuccessfull(response.data));
        toast.dismiss("loadingToast");

        if (!toast.isActive("successToast")) {
          toast.success("Log In Successful", {
            toastId: "successToast",
            hideProgressBar: true,
          });
        }
      }
    } catch (error) {
      dispatch(Usererror());
      toast.dismiss("loadingToast");
      toast.error(error.response.data.message, {
        toastId: "errorToast",
      });
    }
  };

  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="u"
            value={email}
            placeholder="Email"
            required="required"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <input
            type="password"
            name="p"
            value={password}
            placeholder="Password"
            required="required"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-primary btn-block btn-large">
            Let me in.
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
