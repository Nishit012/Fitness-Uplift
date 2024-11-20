import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

function Navbar() {
    const [nav, setNav] = useState(false);
    const [username, setUsername] = useState(null);

    // Change background color when scrolling
    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNav(true);
        } else {
            setNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        const accessToken = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userData");

        if (accessToken && userData) {
            const user = JSON.parse(userData);
            setUsername(user.username);  // Assuming userData contains username
        }

        // Clean up event listener
        return () => window.removeEventListener('scroll', changeBackground);
    }, []);

    const handleLogout = () => {
        // Clear user session on logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");
        setUsername(null);
        window.location.reload()
    };

    return (
        <nav className={nav ? "nav active" : "nav"}>
            <Link to="#" className="logo" smooth={true} duration={1500}>
                <img src={logo} alt="Logo" />
            </Link>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn">
                <span className="nav-icon"></span>
            </label>    
            <ul className="menu">
                <li><ScrollLink to="main" smooth={true} duration={1000}>Home</ScrollLink></li>
                <li><ScrollLink to="features" smooth={true} duration={1000}>Features</ScrollLink></li>
                <li><ScrollLink to="offer" smooth={true} duration={1000}>Offer</ScrollLink></li>
                <li><ScrollLink to="about" smooth={true} duration={1000}>About</ScrollLink></li>
                <li><ScrollLink to="contact" smooth={true} duration={1000}>Contact</ScrollLink></li>

                {/* Show username if logged in, otherwise show Login link */}
                {username ? (
                    <>
                        <li>
                            <Link to="/profile" smooth={true} duration={1000}>
                                {username}
                            </Link>
                        </li>
                        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    </>
                ) : (
                    <li><Link to="/login" smooth={true} duration={1000}>Login</Link></li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;