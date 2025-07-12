import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import Books from "./pages/Booklist";
import UserReviews from "./pages/UserReviews";
import LandingPage from "./pages/LandingPage"; 
import ShowHideNavbar from "./components/ShowHideNavbar";
import PreferenceSetup from "./pages/PreferenceSetup";

function App(){
  return (
    <Router>
      <ShowHideNavbar>
        <Navbar />  
      </ShowHideNavbar>
      
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup-preferences" element={<PreferenceSetup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/books" element={<Books />} />
        <Route path="/user-reviews" element={<UserReviews />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;