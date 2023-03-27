import authReducer from "./slices/authSlice"
import weatherReducer from "./slices/weatherSlice"
import styleReducer from "./slices/styleSlice";
import {configureStore} from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        auth: authReducer,
        weather: weatherReducer,
        style: styleReducer,
    }
})

