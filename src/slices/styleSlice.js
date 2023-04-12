import {createSlice} from "@reduxjs/toolkit";

export const styleSlice = createSlice({
    name: 'style',
    initialState: {
        theme: window.localStorage.getItem("theme") || "light",
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
    },
})

export const {setTheme} = styleSlice.actions
export const selectTheme = state => state.style.theme
export default styleSlice.reducer

