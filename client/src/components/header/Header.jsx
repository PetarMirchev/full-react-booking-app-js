import React from 'react'
import "./header.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPlane, faCar, faTaxi, faPerson } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';


// calendar package - react-date-range And date-fns
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState, useContext } from 'react';
import { format } from "date-fns";


import { useNavigate } from "react-router-dom";

import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

/****************************************************************************** */
const Header = ({ type }) => {
    //useState for open end close calendar window
    const [openDate, setOpenDate] = useState(false);

    //for navigate logic
    const [destination, setDestination] = useState("");


    //useState for package - react-date-range And date-fns
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);



    /************************************************************************** */

    //open & close window for Adult, Children, Room numbers
    const [openOptions, setOpenOptions] = useState(false);


    /*************************************************************************************** */

    //logic/function for + / - on Adult, Children, Room
    //когато кликнем бутона ще вземе предишната стойност на Adult, Children, Room и ще я промени в функцията
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });


    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }
    //************************************************************************************** */

    //A component calling useContext will always re-render when the context value changes.
    const { dispatch } = useContext(SearchContext);

    //******************************************************************************************************* */
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);


    // Search BTN logic sending info & using navigate in "react-router-dom"
    const handleSearch = () => {
        //share/put new info in useState hooks up using --> dispatch 
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
        navigate("/hotels", { state: { destination, dates, options } });
    };

    //************************************************************************************************** */   

    return (
        <div className="header">

            {/* rendering a specific className(CSS) according to condition (in Home page or Not) */}
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxi</span>
                    </div>
                </div>


                {/* condition for visualizing the react fragment when we are not in the home page (hide/show the part with the search)  */}
                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                        <p className="headerDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolores deleniti
                            quibusdam repellat explicabo at voluptatum cumque.</p>
                        {/* if is no "user" (log in) show the button down (Sign in / Register button), if is "user" hide*/}
                        {!user && <button className="headerBtn">Sign in / Register</button>}

                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input type="text"
                                    className="headerSearchInput"
                                    placeholder="Where are you going?"
                                    onChange={e => setDestination(e.target.value)}
                                />
                            </div>


                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />

                                {/* the logic for selecting the days of the calendar transmitted to useState */}
                                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yy")} to ${format(dates[0].endDate, "MM/dd/yy")} `}</span>

                                {/* clendar package - react-date-range And date-fns */}
                                {openDate && (<DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className="date"
                                    minDate={new Date()}
                                />)}
                            </div>


                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult - ${options.children} children  - ${options.room} room`}</span>
                                {openOptions && <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.adult}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.children}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="optionCounterNumber">{options.room}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>}



            </div>
        </div>
    )
}

export default Header