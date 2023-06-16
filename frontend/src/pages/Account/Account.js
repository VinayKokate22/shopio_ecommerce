import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import "./account.css";
const Account = () => {
  const data = useSelector((state) => state.user);
  console.log(data);

  return (
    <div className="Accout_page">
      {data.loading || data.error ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="account_section">
          <div className="profile_card">
            <div className="account_info">
              <img
                src="https://media.thereformation.com/image/upload/f_auto,q_auto,dpr_2.0//PRD-SFCC/1310993/ECO_BEIGE/1310993.1.ECO_BEIGE?_s=RAABAB0"
                alt="User Profile"
              />
            </div>
            <div className="accout_details">
              <div>
                <b>{data.User.name}</b>
                <p>Email : {data.User.email}</p>
              </div>
              <button>Edit Profile</button>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};
export default Account;
