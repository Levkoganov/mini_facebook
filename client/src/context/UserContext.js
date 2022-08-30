import React, { useState } from "react";

export const userContext = React.createContext();

export function UserContext({ children }) {
  const [isLogged, setIsLogged] = useState(false); // Check if loggedin
  const [isAdmin, setIsAdmin] = useState(false); // Check if user is admin
  const [userId, setUserId] = useState(""); // Get loggedin user ID
  const [myPosts, setMyPosts] = useState([]); // User posts
  const [users, setUsers] = useState([]); // All users list

  return (
    <userContext.Provider
      value={{
        isLogged,
        userId,
        myPosts,
        isAdmin,
        users,
        setIsLogged,
        setUserId,
        setMyPosts,
        setIsAdmin,
        setUsers
      }}
    >
      {children}
    </userContext.Provider>
  );
}
