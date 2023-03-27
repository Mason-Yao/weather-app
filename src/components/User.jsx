import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";

import {selectUser, getUser, selectAuthingStatus} from "../slices/authSlice";
import { selectTheme } from "../slices/styleSlice";
import CarouselCurrentWeather from "./CarouselCurrentWeather";
import Header from "./Header";


function User() {
    const theme = useSelector(selectTheme)
    const user = useSelector(selectUser)
    const cities = (user && user.cities) || []

    return (
        <div className={`${theme === "dark" ? "user-bg-dark" : ""}`}>
            <Header />
            <div style={{height: "5rem"}}>&nbsp;</div>
            <CarouselCurrentWeather cities={cities}/>
        </div>
    )
}

export default User;