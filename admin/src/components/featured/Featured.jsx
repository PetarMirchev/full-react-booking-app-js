import React from 'react'
import "./featured.scss";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

//(library circular-progressbar visualization)
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";



const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertOutlinedIcon fontSize="small" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={75} text={"75%"} strokeWidth={6} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">$555</p>
                <p className="desc">
                    Last payments may not be included. Lorem ipsum dolor sit amet, consectetur.

                    <div className="summary">

                        <div className="item">
                            <div className="itemTitle">Target</div>
                            <div className="itemResult positive">
                                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                <div className="resultAmount">$12.4k</div>
                            </div>
                        </div>

                        <div className="item">
                            <div className="itemTitle">Last Week</div>
                            <div className="itemResult negative">
                                <KeyboardArrowDownIcon fontSize="small" />
                                <div className="resultAmount">$4.4k</div>
                            </div>
                        </div>

                        <div className="item">
                            <div className="itemTitle">Last Month</div>
                            <div className="itemResult positive">
                                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                                <div className="resultAmount">$15.4k</div>
                            </div>
                        </div>
                    </div>

                </p>
            </div>
        </div>
    )
}

export default Featured