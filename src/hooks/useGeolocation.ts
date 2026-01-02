import { useState, useEffect, useCallback } from "react";

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  area: string | null;
  loading: boolean;
  error: string | null;
}

// Approximate coordinates for Hyderabad areas
const hyderabadAreaCoordinates: Record<string, { lat: number; lng: number }> = {
  "Banjara Hills": { lat: 17.4156, lng: 78.4347 },
  "Jubilee Hills": { lat: 17.4325, lng: 78.4073 },
  "Gachibowli": { lat: 17.4401, lng: 78.3489 },
  "Madhapur": { lat: 17.4486, lng: 78.3908 },
  "Hitech City": { lat: 17.4474, lng: 78.3762 },
  "Kondapur": { lat: 17.4577, lng: 78.3647 },
  "Kukatpally": { lat: 17.4947, lng: 78.3996 },
  "Secunderabad": { lat: 17.4399, lng: 78.4983 },
  "Begumpet": { lat: 17.4430, lng: 78.4675 },
  "Somajiguda": { lat: 17.4277, lng: 78.4694 },
  "Ameerpet": { lat: 17.4375, lng: 78.4482 },
  "Himayatnagar": { lat: 17.4002, lng: 78.4860 },
  "Nampally": { lat: 17.3880, lng: 78.4703 },
  "Abids": { lat: 17.3929, lng: 78.4753 },
  "Charminar": { lat: 17.3616, lng: 78.4747 },
  "Tolichowki": { lat: 17.3953, lng: 78.4093 },
  "Mehdipatnam": { lat: 17.3950, lng: 78.4377 },
  "Attapur": { lat: 17.3719, lng: 78.4277 },
  "Film Nagar": { lat: 17.4140, lng: 78.4089 },
  "Road No 36": { lat: 17.4275, lng: 78.4185 },
  "Lakdikapul": { lat: 17.4000, lng: 78.4600 },
};

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get coordinates for a location string
export const getLocationCoordinates = (location: string): { lat: number; lng: number } | null => {
  for (const [area, coords] of Object.entries(hyderabadAreaCoordinates)) {
    if (location.toLowerCase().includes(area.toLowerCase())) {
      return coords;
    }
  }
  // Default to Hyderabad center
  return { lat: 17.3850, lng: 78.4867 };
};

// Find nearest area from coordinates
const findNearestArea = (lat: number, lng: number): string => {
  let nearestArea = "Hyderabad";
  let minDistance = Infinity;

  for (const [area, coords] of Object.entries(hyderabadAreaCoordinates)) {
    const distance = calculateDistance(lat, lng, coords.lat, coords.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestArea = area;
    }
  }

  return nearestArea;
};

// Check if coordinates are within Hyderabad bounds
const isInHyderabad = (lat: number, lng: number): boolean => {
  // Approximate Hyderabad bounding box
  return lat >= 17.2 && lat <= 17.6 && lng >= 78.2 && lng <= 78.7;
};

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    area: null,
    loading: false,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        if (!isInHyderabad(latitude, longitude)) {
          setState({
            latitude: null,
            longitude: null,
            area: null,
            loading: false,
            error: "You appear to be outside Hyderabad. DineDeal currently supports Hyderabad only.",
          });
          return;
        }

        const area = findNearestArea(latitude, longitude);
        setState({
          latitude,
          longitude,
          area,
          loading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location access denied. Please enable location to see nearby deals.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information unavailable";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "Location request timed out";
        }
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  }, []);

  return { ...state, requestLocation };
};

export { hyderabadAreaCoordinates };
