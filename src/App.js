import React from "react";
import Dapp from "./components/Dapp";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import MintProfile from "./pages/mintprofile.js";
import ProfileHome from "./pages/profilehome.js";

export default function App() {
  return (
    <>
    {/* <Dapp /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mintprofile" element={<MintProfile />} />
        <Route path="profilehome" element={<ProfileHome />} />
      </Routes>
    </>
  );
}