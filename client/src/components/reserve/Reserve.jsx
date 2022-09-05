import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Reserve = ({ setOpen, hotelId }) => {
    const [selectedRooms, setSelectedRooms] = useState([]);

    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);


    const { dates } = useContext(SearchContext);


    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        const dates = [];

        while (date <= end) {
            dates.push(new Date(data).getTime());
            date.setDate(date.getDate() + 1)
        }

        return dates;
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime())
        );

        return !isFound;
    };


    //********************************************************************************************************************** */
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        //set the State -- condition --> if is checked, take the previous room and add 1 more ID (value) , if is not check (:) whe will filter previous selected rooms & will pull the room ID from selectedRooms  
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    };



    const navigate = useNavigate();
    //function for 'Reserve Now! BTN'
    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/rooms/availability/${roomId}`, {
                        dates: alldates,
                    });
                    return res.data;
                })
            );
            setOpen(false);
            navigate("/");
        } catch (err) { }
    };

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rCLose" onClick={() => setOpen(false)} />
            </div>
            <span>Select your rooms:</span>
            {data.map((item) => (
                <div className="rItem" key={item._id}>
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">Max people: {item.maxPeople}</div>
                        <div className="rPrice">{item.price}</div>
                    </div>

                    <div className="rSelectRooms">
                        {item.roomNumbers.map((roomNumber) => (
                            <div className="room">
                                <label>{roomNumber.number}</label>
                                <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                            </div>
                        ))}
                    </div>
                </div>

            ))}
            <button onClick={handleClick} className="rButton">Reserve Now!</button>
        </div>
    );
};

export default Reserve