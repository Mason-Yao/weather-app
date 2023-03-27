import axios from "axios";

axios.defaults.baseURL = process.env.BACKEND_SERVER_PATH || "http://localhost:13000"

const token = localStorage.getItem('token');

const handleAPI = async (apiCall, ...args) => {
    try {
        const response = await apiCall(...args);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const loginAPI = (credentials) => {
    return handleAPI(axios.post, '/auth/login', credentials);
}

export const registerAPI = (data) => {
    return handleAPI(axios.post, '/auth/register', data);
}

export const getUserAPI = () => {
    return handleAPI(axios.get, '/user', {headers: {'Authorization': 'Bearer ' + token }})
}

export const getWeatherForecastAPI = (city) => {
    return handleAPI(axios.get, `/weather/${city}/forecast`, {headers: {'Authorization': 'Bearer ' + token }});
}

export const updateSavedCitiesAPI = (data) => {
    console.log(data)
    return handleAPI(axios.put, '/user/cities', data, {headers: {'Authorization': 'Bearer ' + token }});
}