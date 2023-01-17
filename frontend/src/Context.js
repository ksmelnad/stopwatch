import axios from "axios";
import React, { useEffect, useState, createContext } from "react";

export const myContext = createContext({});

function Context(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("/getuser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        }
      });
  }, []);
  return <myContext.Provider value={user}>{props.children}</myContext.Provider>;
}

export default Context;
