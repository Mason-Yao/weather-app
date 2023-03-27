import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getWeatherForecastAPI} from "../services/api";


export const getWeatherForecast = createAsyncThunk(
    'weather/getWeatherForecast',
    async (city, { rejectWithValue }) => {
        try {
            return await getWeatherForecastAPI(city)
        } catch (err) {
            const error = {
                cityAlias: err.response.data.cityAlias,
                errorCode: err.response.status,
                errorMessage: err.response.data.message,
            };
            console.log(error)
            throw rejectWithValue(error);
        }
    }
);
export const weatherSlice = createSlice(
    {
        name: 'weather',
        initialState: {
            loginStatus: true,
            weatherData: {}
        },
        reducers: {
        },
        extraReducers: (builder) => {
            builder
                .addCase(getWeatherForecast.fulfilled, (state, action) => {
                    console.log("success")
                    console.log(action.payload)
                    // In the search page, user input may be different from the city name returned by the API,
                    // so we need to use the cityAlias as the key to store the weather data, a selector method
                    // is called by passing the cityAlias as the argument to get the weather data.
                    state.weatherData[action.payload.cityAlias] = {...action.payload, requestStatus: 'succeeded'};
                })
                .addCase(getWeatherForecast.rejected, (state, action) => {
                    console.log("failed")
                    console.log(action.payload)
                    if(action.payload.errorCode === 401) {
                        state.loginStatus = false;
                    }
                    state.weatherData[action.payload.cityAlias] = {error: action.payload, requestStatus: 'failed'};
                }   )
        }
    },
)


export const selectWeatherByCIty = state => city => state.weather.weatherData[city]
export const selectLoginStatus = state => state.weather.loginStatus
export default weatherSlice.reducer