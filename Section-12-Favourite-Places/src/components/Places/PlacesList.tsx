import React from "react";
// import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { ListRenderItem, FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/Place";
// import { PlaceDB } from "../../../types";

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  fallbackText: { fontSize: 16, color: Colors.primary200 },
});

interface PlacesListProps {
  places: Place[];
}

const PlacesList: React.FC<PlacesListProps> = ({ places }) => {
  console.log("🚀 ~ PlacesList ~ places:", JSON.stringify(places, null, 2));
  const renderPlace: ListRenderItem<Place> = (itemData) => {
    return <PlaceItem place={itemData.item} />;
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet. Start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      renderItem={renderPlace}
      keyExtractor={(item) => item.id!.toString()} // item/place will come from DB, id is guaranteed
      style={styles.list}
    />
  );
};

export default PlacesList;
