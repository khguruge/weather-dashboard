import { useState, useEffect } from 'react';
import { LocationData, LocationDataError } from '../types/LocationData';

/**
 * Custom React hook to retrieve the user's geolocation.
 * @returns An object containing the user's location data and any error that occurred.
 */
export const useGeolocation = (): { location: LocationData; error: LocationDataError } => {
  // State variables to store location data and error
  const [location, setLocation] = useState<LocationData>({ latitude: null, longitude: null });
  const [error, setError] = useState<LocationDataError>(null);

  useEffect(() => {
    const getLocation = () => {
      // Check if Geolocation API is supported by the browser
      if (navigator.geolocation) {
        // Retrieve the user's current position
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            if (position.coords.latitude && position.coords.longitude) {
              // Set the location state with the retrieved coordinates
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            }
          },
          // Error callback
          (err: GeolocationPositionError) => {
            // Set the error state with the error message
            setError(err.message);
          }
        );
      } else {
        // Set an error message if Geolocation API is not supported
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();

    // Cleanup function to reset state when the component unmounts or re-renders
    return () => {
      setLocation({ latitude: null, longitude: null });
      setError(null);
    };
  }, []);

  // Return the location data and error
  return { location, error };
};
