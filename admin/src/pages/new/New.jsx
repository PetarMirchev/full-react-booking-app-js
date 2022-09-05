import React from 'react'
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';
import axios from 'axios';


const New = ({ inputs, title }) => {

    //useState for support IMG upload
    const [file, setFile] = useState("");

    const [info, setInfo] = useState({});

    //form input from user
    const handleChange = (e) => {
        setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClick = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file)
        data.append("upload_preset", "upload")
        try {
            // URL to POST(axios.post("https://api.cloud-server.xxx/my-upload?", data); ) IMG to our DB or cloud server ("cloudinary.com" or "firebase")
            const uploadRes = await axios.post("", data);
            console.log(uploadRes.data);

            const { url } = uploadRes.data;

            //after upload will make API request to pass "newUser" object
            const newUser = { ...info, img: url, };
            await axios.post("/auth/register", newUser);

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
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                //if is a "file" use "URL.createObjectURL()" and pass my/user file, if is not a file use the no-image "link"
                                file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt="user-avatar"
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
                                    //implement of useState for IMG
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>


                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                    />
                                </div>
                            ))}


                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default New;
