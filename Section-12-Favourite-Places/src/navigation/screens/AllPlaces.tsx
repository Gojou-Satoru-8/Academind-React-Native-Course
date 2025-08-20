// import { Button, Text } from "@react-navigation/elements";
// import { StyleSheet, View } from "react-native";
import PlacesList from "../../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { Place } from "../../models/Place";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { fetchPlaces } from "../../util/database";

type AllPlacesProps = NativeStackScreenProps<RootStackParamList, "AllPlaces">;

const AllPlaces: React.FC<AllPlacesProps> = ({ route }) => {
  console.log("🚀 ~ AllPlaces ~ route:", route);
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadPlaces = async () => {
      if (isFocused) {
        const places = await fetchPlaces();
        setLoadedPlaces(places);
      }
    };
    loadPlaces();
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//   },
// });

export default AllPlaces;
