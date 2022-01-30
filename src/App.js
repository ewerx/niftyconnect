import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.js';
import MintProfile from './pages/mintprofile.js';
import ProfileHome from './pages/profilehome.js';

export default function App () {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='mintprofile' element={<MintProfile />} />
        <Route path='profilehome' element={<ProfileHome />} />
      </Routes>
    </>
  );
}
