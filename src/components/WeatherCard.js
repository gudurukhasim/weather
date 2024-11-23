import React from 'react';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiFog } from 'react-icons/wi'; // Import weather icons

const WeatherCard = ({ weather }) => {
  // Function to determine the weather icon based on the condition
  const getWeatherIcon = () => {
    if (!weather || !weather.condition) return <WiFog className="text-6xl text-gray-500 animate-pulse" />;

    const condition = weather.condition.toLowerCase(); // Normalize condition to lowercase

    // Return the appropriate icon based on the condition
    if (/sun|clear/.test(condition)) return <WiDaySunny className="text-6xl text-yellow-500 animate-spin-slow" />;
    if (/rain/.test(condition)) return <WiRain className="text-6xl text-blue-500 animate-drop" />;
    if (/snow/.test(condition)) return <WiSnow className="text-6xl text-gray-400 animate-fade" />;
    if (/cloud/.test(condition)) return <WiCloudy className="text-6xl text-gray-600 animate-pulse" />;
    return <WiFog className="text-6xl text-gray-500 animate-fade" />; // Default icon if no match
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md text-center">
      <h2 className="text-2xl font-semibold">{weather.city}</h2> {/* City name */}
      <div className="my-4">{getWeatherIcon()}</div> {/* Display weather icon */}
      <p className="text-lg">{weather.temperature}°C</p> {/* Display temperature */}
      <p className="text-gray-500 capitalize">{weather.condition || 'No condition data'}</p> {/* Display condition */}
    </div>
  );
};

export default WeatherCard;
