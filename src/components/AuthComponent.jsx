import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectAuthingStatus, getUser } from "../slices/authSlice";

const AuthComponent = ({Component}) => {
    const authingStatus = useSelector(selectAuthingStatus);
    const dispatch = useDispatch();
    useEffect(() => {
        // avoid infinite render loop
        if (authingStatus && authingStatus === "idle") {
            dispatch(getUser());
        }
        // redirect to login page if user is not logged in
        if (authingStatus && authingStatus === "failed") {
            window.location.href = "/login";
        }
    })

    return <Component />;
}

export default AuthComponent;

