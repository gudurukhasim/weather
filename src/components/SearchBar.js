import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState(''); // Store the city input in state
  const [error, setError] = useState(''); // Store error messages

  // Function to handle search when the button is clicked
  const handleSearch = () => {
    if (city.trim() === '') {
      setError('Please enter a city name.'); // Show error if input is empty
      return;
    }
    setError(''); // Clear error message
    onSearch(city); // Call onSearch passed as a prop
  };

  // Function to handle "Enter" key press for submitting search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 w-full max-w-md">
      <div className="flex items-center gap-2 w-full">
        <input
          type="text"
          aria-label="City name"
          placeholder="Enter city name..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state on input change
          onKeyPress={handleKeyPress} // Trigger search on "Enter" key press
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleSearch} // Trigger search on button click
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Show error message */}
    </div>
  );
};

export default SearchBar;
