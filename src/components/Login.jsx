import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, toSetError, selectAuthingStatus} from "../slices/authSlice";
import {useEffect} from "react";
import { backendUrl } from "../config";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

import twoCircles from "../images/two-circles.png";
import sideGradients from "../images/side-gradients.png";
import logo from "../images/logo.png";
import Header from "./Header";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/user">
                Minimis
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export function AuthBackground () {
    return (
        <div className="background-container">
            <div className="two-circles">
                <img src={twoCircles} alt="two circles" />
            </div>
            <div className="side-gradients">
                <img src={sideGradients} alt="side gradients" />
            </div>
        </div>
    )
}

export default function Login() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);
    const status = useSelector(selectAuthingStatus);
    const backendServer = backendUrl || "http://localhost:13000";

    if(status && status === "succeeded") {
        window.location.href = "/user";
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        dispatch(login(data));
    };

    const handleGoogleRedirect = () => {
        const { search } = window.location;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        const user = JSON.parse(params.get('user'));
        
        if (token && user) {
            localStorage.setItem('token', token);
            window.location.href = "/user";
        } else {
            dispatch(toSetError(('Failed to authenticate with Google')));
        }
    };
    
    useEffect(() => {
    handleGoogleRedirect();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <AuthBackground />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img src={logo} className="logo-image" alt="logo"/>
                    </Container>
                    <p style={{color: "red"}}>{error && error.errorMessage}</p>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email Address"
                            name="username"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container spacing={2}>
                            <Grid item className="sign-item">
                                <Link href="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                            <Grid item className="sign-item">
                                {/* Google oauth done in the backend need to be in browser context rather than making ajax request*/}
                                <Link href={backendServer + "/auth/google"} variant="body2">
                                    <GoogleIcon />Sign in with Google
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}