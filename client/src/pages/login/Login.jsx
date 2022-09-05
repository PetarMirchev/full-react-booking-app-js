import React from 'react';
import axios from "axios";
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";


const Login = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });


    const { loading, error, dispatch } = useContext(AuthContext);

    //navigate hock to navigate user to Home after successes login 
    const navigate = useNavigate()


    //btn function 
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    //init login process
    const handleClick = async (e) => {
        //to stop auto refresh page --> e.preventDefault()
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };



    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput"></input>
                <input type="text" placeholder="password" id="password" onChange={handleChange} className="lInput"></input>
                <button disabled={loading} onClick={handleClick} className="lButton">Login</button>

                {/* after logon operation is error, whe show error message whit next line */}
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
};

export default Login;
