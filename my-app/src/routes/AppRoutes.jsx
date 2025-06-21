import React from "react";
import { Routes, Route } from "react-router-dom";
import Booking from "../pages/Booking";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import AboutUs from "../components/AboutUs";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResult";
import Search from "../components/Search";
import Home from "../pages/Home";
import SearchTrainNumber from "../components/SearchTrainNumber";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about-us" element={<AboutUs />} />

      {/* <Route path="/" element={<Search />} /> */}
      <Route path="/trains/search" element={<Search />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/search-trains" element={<Search />} />
      <Route path="/search-train-number" element={<SearchTrainNumber />} />
      {/* <Route path="/search" element={<SearchResults />} /> */}
      
    </Routes>
  );
};

export default AppRoutes;
