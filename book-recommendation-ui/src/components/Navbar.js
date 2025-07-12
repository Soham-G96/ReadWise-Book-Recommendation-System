import React from "react";
import { NavLink,useNavigate } from "react-router-dom";

const navLinkStyle = ({ isActive }) =>
    `text-sm font-semibold ${
      isActive ? "text-orange-600 underline underline-offset-4" 
      : "text-gray-700 hover:text-orange-500"
    }`;
const Navbar = ()  => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");

       if (!refreshToken || !accessToken){
        localStorage.clear();
        navigate("/login");
        return;
       } 
       try {
        await fetch ("http://127.0.0.1:8000/api/users/logout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({refresh:refreshToken}),
        });
       } catch (err) {
        console.error("Logout failed:", err);
       } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
       }
    };

    return (
        <header className="backdrop-blur-md bg-white/30 shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="flex-shrink-0 text-orange-600 text-xl font-bold tracking-wide">
                📚 BookWise
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-6 items-center">
                <NavLink to="/home" className={navLinkStyle}>Home</NavLink>
                <NavLink to="/recommendations" className={navLinkStyle}>Recommendations</NavLink>
                <NavLink to="/books" className={navLinkStyle}>Books</NavLink>
                <NavLink to="/user-reviews" className={navLinkStyle}>Reviews</NavLink>
            </div>

            {/* User / Auth Buttons */}
            <div className="hidden md:flex space-x-4 items-center">
                <button 
                onClick= {handleLogout}
                className="bg-orange-500 text-white px-4 py-1 rounded-full shadow hover:bg-orange-600 transition">
                Logout
                </button>
            </div>

            {/* Mobile menu (optional toggle) */}
            <div className="md:hidden">
                {/* Hamburger or dropdown menu can go here */}
            </div>
            </div>
        </nav>
        </header>
    );
};


export default Navbar;