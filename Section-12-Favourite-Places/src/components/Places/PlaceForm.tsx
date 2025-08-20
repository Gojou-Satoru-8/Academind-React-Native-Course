import { ScrollView, View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Colors } from "../../constants/colors";
import { useCallback, useState } from "react";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { LocationCoordsWithAddress } from "../../../types";
import { Place } from "../../models/Place";

const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
  label: { fontWeight: "bold", marginBottom: 4, color: Colors.primary700 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderRadius: 4,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  imageAndLocationContainer: {
    gap: 8,
  },
});

interface PlaceFormProps {
  insertPlace: (place: Omit<Place, "id">) => Promise<void>;
}

const PlaceForm: React.FC<PlaceFormProps> = ({ insertPlace }) => {
  const [title, setTitle] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [pickedLocation, setPickedLocation] = useState<LocationCoordsWithAddress | null>(null);

  console.log("🚀 ~ PlaceForm ~ title:", title);

  const takeImage = useCallback((imageUri: string | null) => {
    setSelectedImageUri(imageUri);
  }, []);

  const pickLocation = useCallback((locationWithAddress: LocationCoordsWithAddress | null) => {
    setPickedLocation(locationWithAddress);
  }, []);

  const savePlace = () => {
    console.log("Title: ", title);
    console.log("Selected Image Uri: ", selectedImageUri);
    console.log("Picked Location: ", pickedLocation);
    if (!title) {
      Alert.alert("Title is required", "Please add a title for your place!", [{ text: "OK" }]);
      return;
    }
    // Perhaps add validations for selectedImageUri and pickedLocation too.

    // Instantiate the new place:
    const newPlace = new Place(title, selectedImageUri, pickedLocation);
    insertPlace(newPlace);
    // insertPlace({
    //   title,
    //   imageUri: selectedImageUri,
    //   address: pickedLocation?.address || null,
    //   location: pickedLocation ? { lat: pickedLocation.lat, lng: pickedLocation.lng } : null,
    // });
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          style={styles.input}
          //   onChangeText={(text) => setTitle(text)}
          onChange={(e) => {
            console.log("onChange:", e.nativeEvent.text); // Similar to e.target.value on ReactDOM
            setTitle(e.nativeEvent.text);
          }}
          // onBlur={(e) => {
          //   console.log("onBlur:", e.nativeEvent.text); // Always undefined
          //   setTitle(e.nativeEvent.text?.trim() || "");
          // }}
        />
      </View>
      <View style={styles.imageAndLocationContainer}>
        <ImagePicker onTakeImage={takeImage} />
        <LocationPicker onPickLocation={pickLocation} />
      </View>
      <Button onPress={savePlace}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;
