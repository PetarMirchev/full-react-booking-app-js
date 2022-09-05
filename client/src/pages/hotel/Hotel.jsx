import React from 'react'
import './hotel.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import useFetch from "../../hooks/useFetch.js"
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Reserve from "../../components/reserve/Reserve";



const Hotel = () => {

    //whe use to find /hotels/62c7daab69d0e21340f9745c ID of the hotel
    const location = useLocation();
    const id = location.pathname.split("/")[2];


    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);


    const { data, loading, error } = useFetch(`http://localhost:8800/api/hotels/find/${id}`);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    //******************************************************************** */
    const { dates, options } = useContext(SearchContext);

    //function provide the Days difference betweens start & end date
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    //show how many (X)  nights you will stay in hotel/sleep
    const days = dayDifference(dates[0].endDate, dates[0].startDate);


    //***************************************************************************************** */

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };


    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
        }
        setSlideNumber(newSlideNumber);
    }

    //************************************************************************** */

    const handleClick = () => {
        if (user) {
            setOpenModel(true);
        } else {
            navigate("/login");
        }
    }


    return (
        <>
            <Navbar />
            <Header type="list" />
            {loading ? ("Loading...") : (
                <div className="hotelContainer">
                    {/* logic for open in big screen IMG for user to interact  */}
                    {open && (
                        <div className="slider">
                            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
                            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
                            <div className="sliderWrapper">
                                <img
                                    src={data.photos[slideNumber]}
                                    alt="sliderImg"
                                    className="sliderImg"
                                />
                            </div>
                            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
                        </div>
                    )}

                    <div className="hotelWrapper">
                        <button className="bookNow"> Reserve or Book Now!</button>
                        <h1 className="hotelTitle">{data.name}</h1>
                        <div className="hotelAddress">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">Good location - {data.distance}m from center</span>
                        <span className="hotelPriceHighLight">Book more of ${data.cheapestPrice} and get a free airport taxi!</span>

                        <div className="hotelImages">
                            {data.photos?.map((photo, i) => (
                                <div className="hotelImgWrapper" key={i}>
                                    <img onClick={() => handleOpen(i)}
                                        src={photo}
                                        alt="Hotel-Img"
                                        className="hotelImg" />
                                </div>
                            ))}
                        </div>

                        <div className="hotelDetails">
                            <div className="hotelDetailsTexts">
                                <h1 className="hotelTitle">{data.title}</h1>
                                <p className="hotelDesc">
                                    {data.description}
                                </p>
                            </div>
                            <div className="hotelDetailsPrice">
                                <h1>Perfect for a {days}-night stay!</h1>
                                <span>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Laborum dolor cumque facere ducimus quae libero?
                                </span>
                                <h2>
                                    <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                                </h2>
                                <button onClick={handleClick}>Reserve or book now!</button>
                            </div>
                        </div>
                        <MailList />
                        <Footer />
                    </div>
                </div>)}
            {openModel && <Reserve setOpen={setOpenModel} hotelId={id} />}
        </>
    )
}

export default Hotel