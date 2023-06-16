import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../loading/Loading";
import DeleteIcon from "@mui/icons-material/Delete";
import "./manageusers.css";
const ManageUsers = () => {
  const [Delete, setDelete] = useState(false);
  const [Users, setUsers] = useState();
  console.log("all users data", Users);
  const [change, setchange] = useState(false);

  const handledeleteUser = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.delete(`/api/v1/admin/users/${id}`);
      console.log(data);
      setDelete(!Delete);
      {
        Delete && toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getalluser = async () => {
      try {
        const { data } = await axios.get("/api/v1/admin/users");

        setUsers(data.users);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getalluser();
  }, [Delete]);
  return (
    <div className="allusersPage">
      <h2>All Users</h2>
      {!Users ? (
        <Loading />
      ) : (
        <div>
          <div className="indexUser">
            <ul>
              <li>name</li>
              <li>email</li>
              <li>_id</li>
              <li>role</li>
              <li>Delete User</li>
            </ul>
          </div>

          {Users.map((user) => {
            return (
              <div className="single_user">
                <span></span>
                <ul>
                  <li>{user.name}</li>
                  <li>{user.email}</li>
                  <li>{user._id}</li>

                  <div className="userrole">
                    <select
                      onChange={async (e) => {
                        try {
                          setchange(true);
                          console.log(e.target.value);
                          const res = await axios.put(
                            `/api/v1/admin/users/${user._id}`,
                            { role: e.target.value }
                          );
                          toast.success(
                            `${user.name} is now ${e.target.value}`
                          );
                          setchange(false);
                          console.log(res.data);
                        } catch (error) {
                          toast.error(error.message);
                        }
                      }}
                      name=""
                      id=""
                      disabled={change}
                    >
                      Change Role
                      <option value={user.role === "user" ? "user" : "admin"}>
                        {user.role === "user" ? "user" : "admin"}
                      </option>
                      <option value={user.role === "user" ? "admin" : "user"}>
                        {user.role === "user" ? "admin" : "user"}
                      </option>
                    </select>
                  </div>
                  <li>
                    <button
                      className="delete_user"
                      onClick={() => {
                        handledeleteUser(user._id);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
