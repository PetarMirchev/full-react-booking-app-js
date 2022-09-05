import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">Pepi Booking React App</span>
                </Link>

                {/* if is no "user" (log in) show dis div down (login/register buttons), if is "user" show his name */}
                {user ? user.username : (
                    <div className="navItems">
                        <button className="navButton">Register</button>
                        <button className="navButton">Login</button>
                    </div>
                )}

            </div>

        </div>
    )
};

export default Navbar