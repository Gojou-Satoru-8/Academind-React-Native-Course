import { ScrollView, Image, View, Text, StyleSheet, Alert } from "react-native";
import OutlinedButton from "../../components/UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../../util/database";
import { Place } from "../../models/Place";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  // screen: { alignItems: "center" },
  fallback: { flex: 1, justifyContent: "center", alignItems: "center" },
  fallbackText: { color: Colors.primary500 },

  image: {
    // minHeight: 300,
    // height: "35%",
    aspectRatio: 16 / 9,
    width: "100%",
  },
  locationContainer: { justifyContent: "center", alignItems: "center" },
  addressContainer: { padding: 20 },
  address: { color: Colors.primary500, textAlign: "center", fontWeight: "bold", fontSize: 16 },
});

type PlaceDetailsProps = NativeStackScreenProps<RootStackParamList, "PlaceDetails">;
const PlaceDetails: React.FC<PlaceDetailsProps> = ({ route }) => {
  console.log("🚀 ~ PlaceDetails ~ route:", route);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "PlaceDetails">>();

  const [fetchedPlace, setFetchedPlace] = useState<Place | null>(null);

  const showLocationOnMap = () => {
    if (!fetchedPlace?.location) return; // either fetchedPlace or fetchedPlace.location is null
    navigation.navigate("Map", {
      preSelectedLocation: { ...fetchedPlace.location },
    });
  };

  useEffect(() => {
    const fetchPlace = async () => {
      const placeId = route.params.id;
      const place = await fetchPlaceById(placeId);
      if (!place) {
        Alert.alert("Missing Place", "No place exists with the given ID", [
          { text: "OK" },
          // { text: "Cancel", style: "destructive" },
        ]);
        return;
      }
      setFetchedPlace(place);
      navigation.setOptions({ title: place.title });
    };
    fetchPlace();
  }, [navigation, route.params.id]);

  if (!fetchedPlace)
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Loading Place Data...</Text>
      </View>
    ); // While it's being queried

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri ?? undefined }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace?.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showLocationOnMap}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;
