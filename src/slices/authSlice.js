import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginAPI, registerAPI, getUserAPI} from "../services/api";



const handleAPIError = async (apiCall, rejectWithValue, ...args) => {
    try {
        return await apiCall(...args);
    } catch (err) {
        const error = {
            errorCode: err.response.status,
            errorMessage: err.response.data.message,
        };
        throw rejectWithValue(error);
    }
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) =>
        handleAPIError(loginAPI, rejectWithValue, credentials )
);


export const register = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) =>
        handleAPIError(registerAPI, rejectWithValue, data)
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (token, { rejectWithValue }) =>
        handleAPIError(getUserAPI, rejectWithValue, token)
);


export const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            user: null,
            status:'idle',
            token:null,
            error: null,
        },
        reducers: {
            setError : (state, action) => {
                state.error = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(login.pending, (state) => {
                    state.status = 'loading';
                    state.error = null;
                })
                .addCase(login.fulfilled, (state, action) => {
                    window.localStorage.setItem('token', action.payload.token);
                    state.status = 'succeeded';
                })
                .addCase(login.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                })
            
                .addCase(register.pending, (state) => {
                    state.status = 'loading';
                    state.error = null;
                })
                .addCase(register.fulfilled, (state, action) => {
                    window.localStorage.setItem('token', action.payload.token);
                    state.status = 'succeeded';
                })
                .addCase(register.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                })
                .addCase(getUser.pending, (state) => {
                    state.status = 'loading';
                    state.error = null;
                })
                .addCase(getUser.fulfilled, (state, action) => {
                    state.user = action.payload;
                    state.status = 'succeeded';
                })
                .addCase(getUser.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                })
        },
    },
)


export const selectUser = (state) => {
    return state.auth.user;
};

export const selectAuthingStatus = (state) => {
    return state.auth.status;
}
export const toSetError = authSlice.actions.setError;

export default authSlice.reducer