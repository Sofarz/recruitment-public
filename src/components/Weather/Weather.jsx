import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import SearchResult from './SearchResult'

const Weather = () => {

    let [location, setLocation] = useState('');
    let [currentWeather, setCurrentWeather] = useState({});
    const [errorMessage, setErrorMessage] = useState(false);
    
    const getCurrentWeather = (e) => {
        e.preventDefault();

        if (location.length === 0) {
            return setErrorMessage(true);
        }
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3addfde144e16d817dcc3a5e9a46ea59`)
        .then(response => response.json())
        .then(response => {
            if (response.cod !== 200) {
                throw new Error ()
            } else {
                setCurrentWeather(response);
                setErrorMessage(false);
            }     
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
            {errorMessage && <ErrorMessage />}
            {(currentWeather.cod === 200 && !errorMessage) && 
                <SearchResult currentWeather={currentWeather} />
            }
        </div>
    )
}

export default Weather;