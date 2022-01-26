import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';

const Weather = () => {

    let [location, setLocation] = useState('');
    let [currentWeather, setCurrentWeather] = useState({});
    const [errorMessage, setErrorMessage] = useState(false);
    
    const getCurrentWeather = (e) => {
        e.preventDefault();

        if (location.length === 0) {
            return setErrorMessage(true)
        }

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a17480f70f0d4368ad0b5eabd0e37b66`)
        .then(response => response.json())
        .then(json => {
            setCurrentWeather(json);
            setErrorMessage(false);
        })
        .catch(() => {
            setErrorMessage(true);
        })
        .finally(() => {
            setLocation('');
        })
    }
    
    return (
        <div>
            <h2>How's the weather out there?</h2>
            <form 
                className="form"
                onSubmit={getCurrentWeather}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    className="textInput"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />                
                <button 
                    className="button" 
                    type="submit"
                >
                    Get Weather
                </button>
            </form>
            <div>
                {errorMessage && <ErrorMessage />}
                {currentWeather.cod === 200 && !errorMessage ? 
                <div>
                <h1 className="location">{currentWeather.name}</h1>
                    <p className="date">{new Date().toDateString()}</p>
                    <div className="temperature">{Math.round(currentWeather.main.temp - 273.25) + '°C'}</div>
                    <div className="icon-description-container">
                        <img 
                            src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} 
                            alt='weather icon' 
                        />
                        <h4 className="weather-description">
                            {currentWeather.weather[0].description}
                        </h4>  
                    </div>
                    </div>
                : null 
                }
            </div>
        </div>
    )
}

export default Weather;