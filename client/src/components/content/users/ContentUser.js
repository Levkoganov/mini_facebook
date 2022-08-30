// Dependency
import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Imports
import { userContext } from "../../../context/UserContext";
import { Button } from "@mui/material";

function ContentUsers() {
  const navigate = useNavigate();
  const { userId, setIsAdmin, isAdmin, users, setUsers } = useContext(userContext);
  // console.log(params)

  useEffect(() => {
    (async function getUsers() {
      try {
        // Get all uers
        const res = await axios.get("/users");

        // Check user role
        const checkIfAdmin = res.data.message.find(
          (data) => data._id === userId
        );

        // Get all users beside current
        const getUsers = res.data.message.filter(
          (product) => product._id !== userId
        );

        if (checkIfAdmin.role === "ADMIN") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setUsers(getUsers)
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userId, setIsAdmin, setUsers]);

  // Redirect by user id
  const getUser = (id, username) => {
      navigate(`/content/${username}/${id}`);
  };

  return (
    <div className="text-center">
      <h3 className="user-title">USERS</h3>

      {/* If admin show btn*/}
      {isAdmin && (
        <div style={{ borderBottom: "1px solid" }}>
          <Button color="error" onClick={() => navigate(`/content/admin`)}>ADMIN PAGE</Button>
        </div>
      )}
      {/* Users */}
      {users.map((data) => (
        <div key={data._id} style={{ borderBottom: "1px solid" }}>
          <Button onClick={() => getUser(data._id, data.username)}>{data.username}</Button>
        </div>
      ))}
    </div>
  );
}

export default ContentUsers;
