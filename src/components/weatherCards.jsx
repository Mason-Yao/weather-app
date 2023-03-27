import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import {selectWeatherByCIty, getWeatherForecast, selectLoginStatus} from "../slices/weatherSlice";
import {selectTheme} from "../slices/styleSlice";


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cloudy from "../images/cloudy.png"
import sunny from "../images/sunny.png"
import rainy from "../images/rainy.png"
import snowy from "../images/snowy.png"
import stormy from "../images/stormy.png"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {selectUser} from "../slices/authSlice";
import {updateSavedCitiesAPI} from "../services/api";
import Container from "react-bootstrap/Container";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Fab} from "@mui/material";
function weatherIconSelect(weatherCondition) {
    if (weatherCondition.toLowerCase().includes("cloud")) {
        return cloudy
    }
    if (weatherCondition.toLowerCase().includes("sun") || weatherCondition.toLowerCase().includes("clear")) {
        return sunny
    }
    if (weatherCondition.toLowerCase().includes("rain")) {
        return rainy
    }
    if (weatherCondition.toLowerCase().includes("snow")) {
        return snowy
    }
    if (weatherCondition.toLowerCase().includes("storm")) {
        return stormy
    }
    return null
}

function CurrentWeatherCard(props) {
    const weatherData = useSelector(selectWeatherByCIty)(props.city)
    const loginStatus = useSelector(selectLoginStatus)
    const weatherRequestStatus = weatherData && weatherData.requestStatus
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWeatherForecast(props.city))

    }, [dispatch, props.city])
    useEffect(() => {
        if(loginStatus === "failed") {
            window.location.href = "/login"
        }
    }, [loginStatus])
    // Initialize the weather data to be displayed
    const currentWeatherData = {
        cityName: "NA",
        tempNow: "NA",
        condition: "NA",
        tempMax: "NA",
        tempMin: "NA",
        weatherIcon: null
    }
    // Check the data request thunk status and update the weather data.
    if (weatherData && weatherData.requestStatus === "succeeded") {
        console.log("mark1")
        console.log(weatherData)
        currentWeatherData.cityName = weatherData.location.name
        currentWeatherData.tempNow = weatherData.current.temp_c
        currentWeatherData.condition = weatherData.current.condition.text
        currentWeatherData.tempMax = weatherData.forecast.forecastday[0].day.maxtemp_c
        currentWeatherData.tempMin = weatherData.forecast.forecastday[0].day.mintemp_c
        currentWeatherData.weatherIcon = weatherIconSelect(weatherData.current.condition.text)
    }

    const theme = useSelector(selectTheme)
    // Prepare user and cities data, send back to server if user add a new city.
    const user = useSelector(selectUser)
    const cities = user && user.cities
    const forecastLink = "/forecast/" + currentWeatherData.cityName
    const handleAddCity = async () => {
        if (cities && !cities.includes(currentWeatherData.cityName)) {
            try {
                await updateSavedCitiesAPI({username: user.username, cities: [...cities, currentWeatherData.cityName]})
                window.location.href = "/user"
            } catch (err) {
                console.log(err)
            }
        }
    }
    const handleRemoveCity = async () => {  
        if (cities && cities.includes(currentWeatherData.cityName)) {
            const newCities = cities.filter(city => city !== currentWeatherData.cityName)
            try {
                await updateSavedCitiesAPI({username: user.username, cities: newCities})
                window.location.href = "/user"
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Card className={`d-flex text-center justify-content-center weather-card border-shadow ${theme === "dark" ? "current-card-dark" : ""}`}>
            <Card.Link className="title-city-name" href={forecastLink} style={{color: "#7DB9B6"}}>
                {currentWeatherData.cityName.toUpperCase()}
            </Card.Link>
            <Card.Text></Card.Text>
            <Container className="weather-image">
                <Card.Img variant="top" src={currentWeatherData.weatherIcon} className="weather-icon"/>
            </Container>

            <Card.Body>
                <Card.Title style={{fontSize: "50px"}}>{currentWeatherData.tempNow} &#8451;</Card.Title>
                <Card.Text style={{fontSize: "25px"}}>
                    {currentWeatherData.condition}
                </Card.Text>
                <Row>&nbsp;</Row>
                <Row>
                    <Col>
                        <Card.Text style={{color: "green", fontSize: "25px"}}>{currentWeatherData.tempMin} &#8451;</Card.Text>
                    </Col>
                    <Col>
                        <Card.Text style={{color: "red", fontSize: "25px"}}>{currentWeatherData.tempMax} &#8451;</Card.Text>
                    </Col>
                </Row>
                <Row>&nbsp;</Row>
                {
                    weatherRequestStatus === "succeeded" && 
                    ((cities.includes(currentWeatherData.cityName)) ?
                        <Button
                        variant="dark"
                        onClick={handleRemoveCity}
                        >
                            REMOVE CITY
                        </Button>
                    :
                        <Button
                        variant="primary"
                        onClick={handleAddCity}
                        disabled={cities.length > 10}
                        >
                            ADD CITY
                        </Button>
                    )
                }
            </Card.Body>
        </Card>

    )
}

function AddCityCard() {
    const searchLink = "/search"
    const theme = useSelector(selectTheme)
    return (
        <Card className={`d-flex text-center justify-content-center weather-card border-shadow ${theme === "dark" ? "current-card-dark" : ""}`}>
            <Card.Link className="title-city-name" href={searchLink} style={{color: "#7DB9B6"}}>
                Add City
            </Card.Link>
            <Card.Body className="d-flex flex-column justify-content-center">
                <Container className="d-flex justify-content-center">
                    <Fab sx={{width:"8rem", height:"8rem"}} >
                        <AddCircleIcon sx={{fontSize:"10rem", color:"rgba(128, 145, 254, 1)"}} onClick={() => window.location.href=searchLink}/>
                    </Fab>
                </Container>

            </Card.Body>
        </Card>
    )
}

function WeatherForecastCard(props) {
    const weatherData = useSelector(selectWeatherByCIty)(props.city)
    const dispatch = useDispatch()

    // Request the weather data from the API
    useEffect(() => {
        dispatch(getWeatherForecast(props.city))

    }, [dispatch, props.city])

    // Initialize the weather data to be displayed
    const weatherForeCastData = []
    const currentWeatherData = {
        cityName: "NA",
        tempNow: "NA",
        condition: "NA",
        windKph: "NA",
        humidity: "NA",
    }
    // when the request thunk is fulfilled, update the weather data
    if (weatherData && weatherData.requestStatus === "succeeded") {
        currentWeatherData.cityName = weatherData.location.name
        currentWeatherData.tempNow = weatherData.current.temp_c
        currentWeatherData.condition = weatherData.current.condition.text
        currentWeatherData.windKph = weatherData.current.wind_kph
        currentWeatherData.humidity = weatherData.current.humidity

        for (let i = 0; i < 3; i++) {
            weatherForeCastData.push({
                date: weatherData.forecast.forecastday[i].date,
                avgTemp: weatherData.forecast.forecastday[i].day.avgtemp_c,
                condition: weatherData.forecast.forecastday[i].day.condition.text,
            })
        }
    }


    return (
        <Card className="text-center justify-content-center border-shadow forecast-card">
            <Row>
                <Col>
                    <Card.Title style={{fontSize: "40px"}}>{currentWeatherData.tempNow} &#8451;</Card.Title>
                    <Card.Text>{currentWeatherData.condition}</Card.Text>
                    <Row>
                        <Col>
                            <Card.Text>WIND</Card.Text>
                            <Card.Text>{currentWeatherData.windKph} KPH</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>HUMIDITY</Card.Text>
                            <Card.Text>{currentWeatherData.humidity} KPH</Card.Text>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Card.Title style={{marginTop: "1rem", fontSize: "20px"}}>{currentWeatherData.cityName}</Card.Title>
                </Col>
            </Row>

            <Card.Body>
                <Row className="d-flex justify-content-end ">
                    {weatherForeCastData.map((day, index) => {
                            return (
                                <Col xs={2} key={index} className="">
                                    <DayWeather date={day.date}
                                                avgTemp={day.avgTemp}
                                                weatherCondition={day.condition}/>
                                </Col>
                            )
                        }
                    )}
                </Row>
                <Row>&nbsp;</Row>
            </Card.Body>
        </Card>
    )
}

function DayWeather(props) {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const data = {
        day: daysOfWeek[new Date(props.date).getDay()],
        avgTemp: props.avgTemp,
        weatherCondition: props.weatherCondition
    }
    const currentWeatherIcon = weatherIconSelect(data.weatherCondition)

    return (
        <Container className="justify-content-center">
            <h2>{data.day}</h2>
            <div style={{height: "10rem"}}>
                <img src={currentWeatherIcon} style={{width: "40%"}}/>
            </div>
            <h4>{data.avgTemp}</h4>
            <p>{data.weatherCondition.toUpperCase()}</p>
        </Container>
    )
}

export {CurrentWeatherCard, AddCityCard, WeatherForecastCard, DayWeather}

