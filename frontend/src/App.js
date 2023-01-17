import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbarcomp from "./components/Navbarcomp";
import Public from "./components/Public";
import Show from "./components/Show";
import Create from "./components/Create";
import { myContext } from "./Context";
import Dashboard from "./components/Dashboard";

function App() {
  const context = useContext(myContext);
  return (
    <>
      <BrowserRouter>
        <Navbarcomp />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {context ? (
            <>
              (
              <Route path="/create" element={<Create />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/public" element={<Public />} />
              <Route path="/public/:id" element={<Show />} />){" "}
            </>
          ) : (
            <Route path="*" element={<h2>Nothing found</h2>} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
