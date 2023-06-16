import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
const Register = () => {
  const [user, Setuser] = useState({
    name: "",
    email: "",
    password: null,
  });
  const config = { headers: { "Content-Type": "application/json" } };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/register",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        config
      );
      console.log(res);
    } catch (error) {}
  };
  return (
    <div className="login_page">
      <div className="signup_page_background_img" data-aos="fade"></div>
      {/* i have changed the class name of the upper div from login_page_background_img */}
      <div className="login_credentials">
        <div className="login_title " data-aos="fade-left">
          <h2>Signup</h2>
          <p>Enter your details to create an account.</p>
        </div>
        <div>
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="contactform"
            data-aos="fade-left"
          >
            <fieldset className="login_credentials_card">
              <label htmlFor="username">
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="username"
                onChange={(e) => Setuser({ ...user, name: e.target.value })}
                id="username"
                required
              />

              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => Setuser({ ...user, email: e.target.value })}
                name="email"
                id="email"
                required
              />
              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                onChange={(e) => Setuser({ ...user, password: e.target.value })}
                placeholder="Enter Password"
                name="psw"
                id="psw"
                required
              />
              <button type="submit" className="formbutton">
                Signup
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
