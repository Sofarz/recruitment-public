import React from 'react'

const SearchResult = ({ currentWeather }) => {
    return ( 
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
    )
}

export default SearchResult;
