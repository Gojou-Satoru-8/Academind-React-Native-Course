import * as SQLite from "expo-sqlite";
import { Place } from "../models/Place";
import { PlaceDB } from "../../types";

let db: SQLite.SQLiteDatabase | null = null;

async function getDB() {
  if (!db) db = await SQLite.openDatabaseAsync("places.db");
  return db;
}

export async function initDB() {
  const db = await getDB();
  const result = await db.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          image_uri TEXT NOT NULL,
          address TEXT,
          lat REAL,
          lng REAL
      )`
  );
  console.log("🚀 ~ initDB ~ result:", result);
}

export async function insertPlaceToDB(place: Omit<Place, "id">) {
  const db = await getDB();

  const result = await db.runAsync(
    `INSERT INTO places (title, image_uri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    place.title,
    place.imageUri,
    place.address,
    place.location ? place.location.lat : null,
    place.location?.lng ?? null // Both these statements result to the same thing
  );

  console.log("🚀 ~ insertPlace ~ result:", JSON.stringify(result, null, 2));
  return result;
}

export async function fetchPlaces() {
  const db = await getDB();
  const result: PlaceDB[] = await db.getAllAsync("SELECT * FROM places");
  // NOTE: getAllAsync returns an array, may be empty
  // console.log("🚀 ~ fetchPlaces ~ result:", JSON.stringify(result, null, 2));

  const places = result.map((place) => {
    const locationWithCoords =
      place.address && place.lat && place.lng
        ? { address: place.address, lat: place.lat, lng: place.lng }
        : null;
    return new Place(place.title, place.image_uri, locationWithCoords, place.id);
  });
  console.log("🚀 ~ fetchPlaces ~ places:", JSON.stringify(places, null, 2));
  return places;
}

export async function fetchPlaceById(id: number) {
  const db = await getDB();
  const result: PlaceDB | null = await db.getFirstAsync(`SELECT * FROM places WHERE ID = ?`, id);
  // NOTE: getFirstAsync returns the first row that matches, may be null
  // console.log("🚀 ~ fetchPlaceById ~ result:", JSON.stringify(result, null, 2));

  if (result === null) return null;

  const place = new Place(
    result.title,
    result.image_uri,
    result.address && result.lat && result.lng
      ? { address: result.address, lat: result.lat, lng: result.lng }
      : null,
    result.id
  );
  console.log("🚀 ~ fetchPlaceById ~ place:", JSON.stringify(place, null, 2));
  return place;
}
