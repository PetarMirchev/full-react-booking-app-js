import React from 'react';
import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useState } from 'react';
import { roomInputs } from '../../formSource';
import useFetch from "../../hooks/useFetch";
import axios from "axios";





const NewRoom = () => {

    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);

    const { data, loading, error } = useFetch("/hotels");


    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        try {
            await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
        } catch (err) {
            console.log(err);
        }
    };





    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add new Room</h1>
                </div>
                <div className="bottom">

                    <div className="right">
                        <form>
                            {roomInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input id={input.type} type={input.type}
                                        placeholder={input.placeholder} onChange={handleChange}
                                    />
                                </div>
                            ))}

                            <div className="formInput">
                                <label>Rooms</label>
                                <textarea onChange={(e) => setRooms(e.target.value)} placeholder="pls give comma between room numbers." />
                            </div>

                            <div className="formInput" >
                                <label>Choose a hotel</label>
                                <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                                    {/* show loading if is data, map to data & for each hotel create option */}
                                    {loading ? "loading" : data && data.map((hotel) => (
                                        <options key={hotel._id} value={hotel._id}> {hotel.name} </options>
                                    ))}
                                </select>
                            </div>

                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRoom;
