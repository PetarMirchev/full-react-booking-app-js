// HOTELS LIST

import React, { useState } from 'react';
import './list.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import { format } from "date-fns";
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch'; // & reFetch


const List = () => {

    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination);
    const [dates, setDates] = useState(location.state.dates);
    const [options, setOptions] = useState(location.state.options);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const [openDate, setOpenDate] = useState(false);



    const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

    //after change search parameters refresh/refetch all
    const handleClick = () => {
        reFetch();
    };



    return (
        <div>
            <Navbar />

            {/* when render "Header" we pass check to  see  we ar not in Home page! & change the CSS className rendered styles (by type="list")  */}
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItem">
                            <label className="">Destination</label>
                            <input placeholder={destination} type="text" />
                        </div>
                        <div className="lsItem">
                            <label>Check-in Date</label>

                            <span onClick={() => setOpenDate(!openDate)}>
                                {`${format(
                                    dates[0].startDate,
                                    "MM/dd/yyyy"
                                )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`} </span>

                            {openDate && (
                                <DateRange onChange={(item) => setDates([item.selections])}
                                    minDate={new Date()}
                                    ranges={dates} />
                            )}
                        </div>



                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">

                                <div className="lsOptionItem">
                                    <span className="isOptionText">Min price <small>per night</small></span>
                                    <input type="number" onChange={e => setMin(e.target.value)} className="lsOptionInput" />
                                </div>

                                <div className="lsOptionItem">
                                    <span className="isOptionText">Max price <small>per night</small></span>
                                    <input type="number" onChange={e => setMax(e.target.value)} className="lsOptionInput" />
                                </div>

                                <div className="lsOptionItem">
                                    <span className="isOptionText">Adult </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} />
                                </div>

                                <div className="lsOptionItem">
                                    <span className="isOptionText">Children </span>
                                    <input type="number" min={0} className="lsOptionInput" placeholder={options.children} />
                                </div>

                                <div className="lsOptionItem">
                                    <span className="isOptionText">Room </span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={options.room} />
                                </div>

                            </div>
                        </div>
                        {/* btn call reFetch */}
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ? ("Loading...") : (
                            <>
                                {data.map((item) => (
                                    <SearchItem item={item} key={item._id} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;