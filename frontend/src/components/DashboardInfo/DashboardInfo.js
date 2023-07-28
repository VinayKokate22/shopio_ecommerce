import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./dashboardinfo.css";
const DashboardInfo = () => {
  const [userdata, setuserdata] = useState();
  const [productdata, setproductdata] = useState();
  const [orderdata, setorderdata] = useState();

  useEffect(() => {
    const getAlldata = async () => {
      try {
        const Productresponse = await axios.get("/api/v1/allproduct");
        const Userresponse = await axios.get("/api/v1/admin/users");
        const Orderresponse = await axios.get("api/v1/admin/orders");
        setuserdata(Userresponse.data.users);
        setproductdata(Productresponse.data);
        setorderdata(Orderresponse.data);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    getAlldata();
  }, []);
  let totaladmin = 0;
  let total_outofstockitem = 0;
  let total_processingorders = 0;
  let total_deliveredorders = 0;
  return (
    <div className="dashboardinfo_section">
      <h2 style={{ marginBottom: "2rem" }}>Admin Dashboard</h2>
      <div className="dashboardinfo_container">
        <div className="dashboardtotalinfo">
          <div className="dashboardinfo_singleContainer">
            <h3>Total Users</h3>
            <h2>{userdata?.length ? userdata.length : 0}</h2>
          </div>
          <div className="dashboardinfo_singleContainer">
            <h3>Admins</h3>

            {userdata?.map((e) => {
              if (e.role === "admin") {
                totaladmin++;
                // return <li>{e.name}</li>;
              }
            })}
            <h2>{totaladmin}</h2>
          </div>
        </div>
        <div className="dashboardtotalinfo">
          <div className="dashboardinfo_singleContainer">
            <h3>Total Products</h3>

            <h2>{productdata?.productCount ? productdata?.productCount : 0}</h2>
          </div>
          <div className="dashboardinfo_singleContainer">
            <h3>Total Out of Stock Products</h3>
            {productdata?.product?.forEach((e) => {
              if (e.stock == 0) {
                total_outofstockitem++;
              }
            })}
            <h2>{total_outofstockitem}</h2>
          </div>
        </div>

        <div className="dashboardtotalinfo">
          {orderdata?.orders.forEach((e) => {
            if (e.orderStatus === "Processing") {
              total_processingorders++;
            } else if (e.orderStatus === "Delivered") {
              total_deliveredorders++;
            }
          })}
          <div className="dashboardinfo_singleContainer">
            <h3>Total Orders</h3>
            <h2>{orderdata?.orders?.length ? orderdata?.orders?.length : 0}</h2>
          </div>
          <div className="dashboardinfo_singleContainer">
            <h3>Processing orders</h3>
            <h2>{total_processingorders}</h2>
          </div>
          <div className="dashboardinfo_singleContainer">
            <h3>Delivered Orders</h3>
            <h2>{total_deliveredorders}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInfo;
