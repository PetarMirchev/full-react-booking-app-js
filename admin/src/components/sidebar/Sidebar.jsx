import React from 'react'
import "./sidebar.scss";

import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import { Link } from 'react-router-dom';

import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext.js";



const Sidebar = () => {

    const { dispatch } = useContext(DarkModeContext);

    return (
        <div className="sidebar">

            <div className="top">
                {/* inline style for removing underLine of text */}
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Pepi LOGO Admin</span>
                </Link>
            </div>

            <hr />

            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className="icon" />
                        <span>Dashboard</span>
                    </li>

                    <p className="title">LISTS</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <SupervisedUserCircleIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/hotels" style={{ textDecoration: "none" }}>
                        <li>
                            <NewspaperIcon className="icon" />
                            <span>Hotels</span>
                        </li>
                    </Link>
                    <Link to="/rooms" style={{ textDecoration: "none" }}>
                        <li>
                            <FeaturedPlayListOutlinedIcon className="icon" />
                            <span>Rooms</span>
                        </li>
                    </Link>
                    <li>
                        <LocalShippingIcon className="icon" />
                        <span>Delivery</span>
                    </li>
                    <p className="title">USEFUL INFO</p>
                    <li>
                        <EqualizerIcon className="icon" />
                        <span>Stats</span>
                    </li>
                    <li>
                        <NotificationsActiveOutlinedIcon className="icon" />
                        <span>Notification</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className="icon" />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyIcon className="icon" />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsIcon className="icon" />
                        <span>Settings</span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
                    </li>
                    <li>
                        <ExitToAppOutlinedIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>

            {/* buttons for changing color of the background White/Black */}
            <div className="bottom">
                <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}>W</div>
                <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}>B</div>
            </div>
        </div>
    )
}

export default Sidebar