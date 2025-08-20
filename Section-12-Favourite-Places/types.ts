import { Place } from "./src/models/Place";

export type RootStackParamList = {
  AllPlaces: { place: Place } | undefined;
  PlaceDetails: { id: number };
  AddPlace: { pickedLat: number; pickedLng: number; callingScreenKey?: string } | undefined;
  Map: { callingScreenKey?: string; preSelectedLocation?: LocationCoordinates } | undefined;
};

export type PlaceDB = {
  id: number;
  title: string;
  image_uri: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  // location: LocationCoordinates | null;
};

export type LocationCoordinates = { lat: number; lng: number };
export type LocationCoordsWithAddress = LocationCoordinates & { address: string };
type PlusCode = { compound_code: string; global_code: string };

export interface ReverseGeocodingAPIResponse {
  status: string;
  plus_code: PlusCode;
  results: {
    addressComponents: { long_name: string; short_name: string; types: string[] }[];
    formatted_address: string;
    geometry: {
      location: LocationCoordinates;
      location_type: string;
      viewport: { northeast: LocationCoordinates; southwest: LocationCoordinates };
      place_id: string;
      plus_code: PlusCode;
      types: string[];
    };
  }[];
}
