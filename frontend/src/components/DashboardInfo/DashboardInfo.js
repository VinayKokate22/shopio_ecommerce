import axios from "axios";
import React, { useEffect } from "react";

const DashboardInfo = () => {
  useEffect(() => {
    const Producturl = "/api/v1/product";
    const getAlldata = async () => {
      try {
        const Productresponse = await axios.get(Producturl);
        const Userresponse = await axios.get("/api/v1/admin/users");
        const Productdata = Productresponse.data;

        const Userdata = Userresponse.data;
        console.log(Userdata);
        console.log(Productdata);
        const totalProduct = Productdata.productCount;
        var outofstockProduct = 1;

        totalProduct.product.foreach((e) => {
          if (e.stock == 0) {
            outofstockProduct++;
          }
        });
        console.log("outofstockProduct", outofstockProduct);
      } catch (error) {}
    };
    getAlldata();
  }, []);
  return (
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DashboardInfo;
