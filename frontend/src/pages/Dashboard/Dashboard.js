import React, { useState } from "react";
import "./dashboard.css";
import DashboardInfo from "../../components/DashboardInfo/DashboardInfo";
import ManageProduct from "../../components/ManageProduct/ManageProduct";
import ManageOrder from "../../components/ManageOrder/ManageOrder";
import ManageReviews from "../../components/ManageReviews/ManageReviews";
import ManageUsers from "../../components/ManageUsers/ManageUsers";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
const Dashboard = () => {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const [index, setindex] = useState(0);
  const option = ["Dashboard", "Product", "Orders", "Users"];
  return (
    <div className="dashboard_page">
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
      <div>
        {index == 0 && <DashboardInfo />}
        {index == 1 && <ManageProduct />}
        {index == 2 && <ManageOrder />}
        {index == 3 && <ManageUsers />}
      </div>
    </div>
  );
};

export default Dashboard;
