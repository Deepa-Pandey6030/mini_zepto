// src/pages/Location.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext'; // For showing modal messages

function Location() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null); // { lat, lng }
  const [mapUrl, setMapUrl] = useState('');
  const { showModal } = useCart();

  // Function to simulate fetching coordinates (in a real app, use Geocoding API)
  const getCoordinates = (inputAddress) => {
    // Dummy coordinates for common places
    const dummyLocations = {
      "new york": { lat: 40.7128, lng: -74.0060 },
      "london": { lat: 51.5074, lng: -0.1278 },
      "mumbai": { lat: 19.0760, lng: 72.8777 },
      "palghar": { lat: 19.6917, lng: 72.7750 }, // Added Palghar
      "paris": { lat: 48.8566, lng: 2.3522 },
    };

    const lowerAddress = inputAddress.toLowerCase();
    for (const key in dummyLocations) {
      if (lowerAddress.includes(key)) {
        return dummyLocations[key];
      }
    }
    return { lat: 34.0522, lng: -118.2437 }; // Default to Los Angeles if not found
  };

  const handleSetLocation = (e) => {
    e.preventDefault();
    if (!address) {
      showModal("Please enter an address.");
      return;
    }
    const coords = getCoordinates(address);
    setCoordinates(coords);
    // Generate a Google Maps embed URL (for demonstration)
    setMapUrl(`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`);
    showModal(`Location set to: ${address}`);
  };

  // Optional: Get user's current location using Geolocation API
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          setMapUrl(`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`);
          showModal("Current location detected!");
          // Reverse geocoding to get address from coords is more complex, so we'll skip for hackathon
          setAddress(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
        },
        (error) => {
          console.error("Geolocation error:", error);
          showModal("Could not get current location. Please enter manually.");
        }
      );
    } else {
      showModal("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    // Try to get current location on component mount
    getCurrentLocation();
  }, []); // Run once on mount

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Set Your Delivery Location</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Your Address</h2>
        <form onSubmit={handleSetLocation} className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out flex-grow"
            placeholder="e.g., 123 Main St, Anytown, State"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Set Location
          </button>
        </form>
        <div className="text-center">
            <button
              onClick={getCurrentLocation}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-sm"
            >
              Use Current Location
            </button>
            <p className="text-sm text-gray-500 mt-2">
              (Requires browser location permission)
            </p>
        </div>
      </div>

      {mapUrl && (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Location on Map</h2>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.75rem', position: 'absolute', top: 0, left: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {coordinates && (
            <p className="text-gray-700 text-center mt-4">
              Coordinates: Lat {coordinates.lat.toFixed(4)}, Lng {coordinates.lng.toFixed(4)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Location;