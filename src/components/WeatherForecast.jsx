import {WeatherForecastCard} from "./weatherCards";
import {useParams} from "react-router-dom";
import Header from "./Header";
import {useSelector} from "react-redux";

function WeatherForecast () {
    const {cityName} = useParams();
    const theme = useSelector(state => state.style.theme);
    
    return (
        <div className={`${theme === "dark" ? "user-bg-dark" : ""}`}>
            <Header />
            <div>
                <div style={{height: "4rem"}} >&nbsp;</div>
                    <div className="d-flex justify-content-center">
                        <WeatherForecastCard
                        city={cityName}
                        />
                    </div>
                </div>
        </div>
    );
}

export default WeatherForecast