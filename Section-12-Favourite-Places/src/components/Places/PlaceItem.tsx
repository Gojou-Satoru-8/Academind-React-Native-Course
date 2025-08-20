import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../navigation";
import { RootStackParamList } from "../../../types";
import { Place } from "../../models/Place";
import { Colors } from "../../constants/colors";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 1,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.75,
    shadowOffset: { width: 2, height: 2 },
  },
  pressed: { opacity: 0.8 },
  image: { flex: 1, borderBottomLeftRadius: 4, borderTopLeftRadius: 4, height: 100 },
  info: { flex: 2, padding: 12 },
  title: { fontWeight: "bold", fontSize: 18, color: Colors.gray700 },
  address: { fontSize: 12, color: Colors.gray700 },
});

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={() => navigation.navigate("PlaceDetails", { id: place.id as number })}
    >
      <Image source={{ uri: place.imageUri ?? undefined }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
