import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import AboutMe from "./page/AboutMe/AboutMe";
import Notes from "./page/Notes/Notes";
import GalleryIndex from "./page/Gallery/GalleryIndex";
import NeurIPS2025 from "./page/Gallery/NeurIPS2025";
import CPAL2025 from "./page/Gallery/CPAL2025";
import Pets from "./page/Gallery/Pets";
import BJJ from "./page/Gallery/BJJ";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/gallery" element={<GalleryIndex />} />
        <Route path="/gallery/neurips2025" element={<NeurIPS2025 />} />
        <Route path="/gallery/cpal2025" element={<CPAL2025 />} />
        <Route path="/gallery/pets" element={<Pets />} />
        <Route path="/gallery/bjj" element={<BJJ />} />
        <Route path="/notes" element={<Notes />} />
        {/* <Route path="/add" element={<AddNews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
