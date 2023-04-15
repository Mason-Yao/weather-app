# Weather App

### [Minimis weather](http://weather.xixi2020.com)
### [Minimis Weather AWS](http://weather.xixi2020.com.s3-website-ap-southeast-2.amazonaws.com)

This is a weather app that allows users to search for weather information by city name and view a 3-day weather forecast for a selected city. Users can register and log in to the app to save their favorite cities for quick access to weather information. It is a frontend backend separated project, refer to [weather-server Github repo](https://github.com/Mason-Yao/weather-server.git) for backend part.

The backend server and database are running on AWS Elastic Container Service, front end part is hosted on AWS S3. Visit [Minimis weather](http://weather.xixi2020.com) or [Minimis Weather AWS](http://weather.xixi2020.com.s3-website-ap-southeast-2.amazonaws.com) (if the first domain expires) to browse whole content.

## Technologies Used

* React
* React Router
* Redux Toolkit
* Bootstrap
* MUI
* Axios

## Getting Started

To get started with the app, clone the repository and install the dependencies:
```
git clone https://github.com/Mason-Yao/weather-app.git
cd weather-app
npm install
```

The backend server url is set in config.js, it is set to null by default for local environment and will communicate to http://localhost:13000 locally

Then start app:
```
npm start
```
## Features

### Search for Weather Information

On the search page, users can enter a city name and click "Search" to get the current weather information for that city. The app uses the OpenWeatherMap API to get the weather information.

### View 3-Day Weather Forecast

On the weather forecast page, users can view a 3-day weather forecast for a selected city. Users can access this page by clicking on a city name in the home page.

### Register and Log In

Users can register for an account and log in to save their favorite cities. The app uses JWT authentication to handle user authentication. User can also signin with Google Oauth.

### Save Favorite Cities

Logged-in users can save their favorite cities for quick access to weather information. They can also remove cities from their list of favorites.

## Deploy

You can run the project locally or refer to backend repository https://github.com/Mason-Yao/weather-server.git to deploy the application on AWS serverless.

