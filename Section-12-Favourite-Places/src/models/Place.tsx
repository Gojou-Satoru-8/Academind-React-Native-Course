import { LocationCoordinates, LocationCoordsWithAddress } from "../../types";

export class Place {
  // id: number | undefined;
  location: LocationCoordinates | null;
  address: string | null;
  constructor(
    // public id: string,
    public title: string,
    public imageUri: string | null,
    location: LocationCoordsWithAddress | null,
    public id?: number
  ) {
    this.id = id; // For place coming from DB, id is available, else not.
    this.location = location ? { lat: location.lat, lng: location.lng } : null;
    this.address = location?.address ?? null;
  }
}

// const p1 = new Place("title", "imageUri", "address", { lat: "123", lng: "456" });
// console.log(p1.id, p1.title, p1.address, p1.location, p1.imageUri);
