import React from 'react';
import "./styles/navbar.css"
import {Link, useNavigate} from 'react-router-dom';
function Navbar({ showNavbar, toggleNavbar }) {
    const navigate = new useNavigate()
    return (
        <div>
            <nav className={`navbar ${showNavbar ? 'show' : 'hide'}`}>
                <ul>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/addpost">Add Post</Link>
                    </li>
                    <li>
                        <Link to="/">Feed</Link>
                    </li>
                    <li>
                        <h5 onClick={
                            ()=>{
                                localStorage.removeItem("access_token")
                                navigate("/signin")
                        }
                        }>LOG OUT</h5>
                    </li>
                </ul>
            </nav>

            <button className="navbar-toggle" onClick={toggleNavbar}>
                {showNavbar ? 'Hide Navbar' : 'Show Navbar'}
            </button>
        </div>

    );
};

export default Navbar;