import { ReverseGeocodingAPIResponse } from "../../types";

const GOOGLE_MAPS_API_KEY = "AIzaSyDq7jeVZ60myNMoHBeSCuMpoXSkBQUyDkQ";

export const getMapPreview = (lat: number, lng: number) => {
  const imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

  return imagePreview;
};

// &signature=YOUR_SIGNATURE

export const getAddressFromCoordinates = async (lat: number, lng: number) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
  );

  if (!response.ok) throw new Error("Failed to fetch address");
  const data: ReverseGeocodingAPIResponse = await response.json();
  const address = data.results.at(0)?.formatted_address ?? "";
  return address;
};
