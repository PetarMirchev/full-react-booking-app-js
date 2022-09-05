import React from 'react'
import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = ({ title }) => {

    //useState for support IMG upload
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);

    const { data, loading, error } = useFetch("/rooms");


    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setRooms(value);
    };

    console.log(files);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_reset", "upload");
                    // URL to POST(axios.post("https://api.cloud-server.xxx/my-upload?", data); ) IMG to our DB or cloud server ("cloudinary.com" or "firebase")
                    const uploadRes = await axios.post("", data);

                    const { url } = uploadRes.data;
                    return url;
                })
            );

            const newHotel = { ...info, rooms, photos: list, };

            await axios.post("/hotels", newHotel);
        } catch (err) { console.log(err) }
    };






    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                //if is a "file" use "URL.createObjectURL()" and pass my/user file, if is not a file use the no-image "link"
                                files ? URL.createObjectURL(files[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt="hotel-img"
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                {/* make icon active for upload files (id="file") and hide text/button */}
                                <label htmlFor="file">
                                    image:<UploadFileIcon className="icon" /></label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    //implement of useState for multiple IMG-s
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                />
                            </div>


                            {hotelInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Featured</label>
                                <select id="featured" onChange={handleChange}>
                                    <option value={false}>NO</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="selectRooms">
                                <label>Rooms</label>
                                <select id="rooms" multiple onChange={handleSelect}>
                                    {loading ? "loading" : data && data.map((room) => (
                                        <option key={room._id} value={room._id}>
                                            {room.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button onClick={handleClick} >Send</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewHotel;
