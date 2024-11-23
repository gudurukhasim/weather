import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar'; // Import SearchBar component
import WeatherCard from '../components/WeatherCard'; // Import WeatherCard component

const WeatherPage = () => {
  const [weather, setWeather] = useState(null); // Store weather data in state

  // Weather descriptions for different weather codes
  const weatherCodeDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Drizzle: Light',
    53: 'Drizzle: Moderate',
    55: 'Drizzle: Dense',
    61: 'Rain: Slight',
    63: 'Rain: Moderate',
    65: 'Rain: Heavy',
    71: 'Snowfall: Slight',
    73: 'Snowfall: Moderate',
    75: 'Snowfall: Heavy',
    95: 'Thunderstorm: Slight or moderate',
    99: 'Thunderstorm: With hail',
  };

  // Function to fetch weather data from Open-Meteo API based on latitude and longitude
  const fetchWeather = async (latitude, longitude, city) => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const { current_weather } = response.data;
      setWeather({
        city, // City name
        temperature: current_weather.temperature, // Current temperature
        condition: weatherCodeDescriptions[current_weather.weathercode] || 'Unknown', // Weather condition
      });
    } catch (error) {
      console.error('Error fetching weather:', error); // Handle error
    }
  };

  // Function to handle search by city name
  const handleSearch = async (city) => {
    try {
      // Fetch geographic coordinates (latitude and longitude) of the city
      const geocodeResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
      );
      const { lat, lon } = geocodeResponse.data[0]; // Extract latitude and longitude
      fetchWeather(lat, lon, city); // Call fetchWeather with coordinates
    } catch (error) {
      console.error('Error fetching geocode data:', error); // Handle error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 flex flex-col items-center">
      <h1 className="text-white text-4xl font-bold my-8">Weather Now</h1>
      {/* Search bar for city input */}
      <SearchBar onSearch={handleSearch} />
      
      {/* Show weather information or prompt to search */}
      {weather ? (
        <div className="mt-8">
          <WeatherCard weather={weather} /> {/* Pass weather data to WeatherCard */}
        </div>
      ) : (
        <p className="text-white mt-8">Search for a city to see the weather.</p> 
        
      )}
    </div>
  );
};

export default WeatherPage;
