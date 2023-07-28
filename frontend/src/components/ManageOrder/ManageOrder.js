import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import "./manageorder.css";
import moment from "moment";
import { toast } from "react-toastify";
const ManageOrder = () => {
  const [Allorders, setAllorders] = useState();
  const [hidden, sethidden] = useState();
  const [change, setchange] = useState(false);
  useEffect(() => {
    const getAllorders = async () => {
      try {
        const res = await axios.get("api/v1/admin/orders");
        console.log(res.data);
        setAllorders(res.data);
      } catch (error) {}
    };
    getAllorders();
  }, []);
  if (!Allorders) {
    return <Loading />;
  }
  return (
    <div className="allorders_section">
      <h2>All orders</h2>
      <ul className=" singleorder_list_index">
        <li>Order Id</li>
        <li>Date</li>
        <li id="itemcount">Items</li>
        <li>Total Price</li>
        <li>Status</li>
      </ul>
      {Allorders.orders.map((e, i) => {
        let totalitems = 0;
        const date = moment().format("MMM Do YY");
        return (
          <div
            key={i}
            className="singleorder_container"
            onClick={() => {
              if (hidden == i) {
                sethidden(null);
              } else {
                sethidden(i);
              }
            }}
          >
            <span></span>
            <ul className="singleorder_list">
              {e.orderItem.forEach((event) => {
                totalitems = totalitems + event.quantity;
              })}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {hidden === i && (
                  <input
                    defaultChecked={hidden === i}
                    type="radio"
                    id="html"
                    name="fav_language"
                    value=""
                  ></input>
                )}
                <li>{e._id}</li>
              </div>
              <li>{date}</li>
              <p id="itemcount">{totalitems}</p>
              <li>{e.totalPrice}</li>
              {e.orderStatus == "Processing" ? (
                <select
                  onChange={async (ll) => {
                    try {
                      setchange(true);
                      console.log(ll.target.value);
                      const res = await axios.post(
                        `/api/v1/admin/order/${e._id}`,
                        {
                          status: ll.target.value,
                        }
                      );
                      toast.success(`OrderStatus is now ${ll.target.value}`);
                      setchange(false);
                      console.log(res.data);
                    } catch (error) {
                      setchange(false);
                      console.log(error);
                      toast.error(error.message);
                    }
                  }}
                  name=""
                  id=""
                  disabled={change}
                >
                  <option value={e.orderStatus}>{e.orderStatus}</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                </select>
              ) : (
                <li>Delivered</li>
              )}
            </ul>
            {hidden === i && (
              <div className="orderitem_section">
                <div className="orderitem_container">
                  {e.orderItem.map((single) => {
                    return (
                      <div className="single_orderitem">
                        <img src={single.image} alt="product image" />
                        <p>Product : {single.name}</p>
                        <p>Quantity : {single.quantity}</p>
                        <p>Item Price : {single.price}</p>
                      </div>
                    );
                  })}
                  <div></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ManageOrder;
