import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, {
  MapPressEvent,
  Marker,
  // PROVIDER_DEFAULT,
  // PROVIDER_GOOGLE,
} from "react-native-maps";
import { RootStackParamList } from "../../../types";
import IconButton from "../../components/UI/IconButton";
import { CommonActions, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  map: { flex: 1 },
});

type MapProps = NativeStackScreenProps<RootStackParamList, "Map">;

const Map: React.FC<MapProps> = (props) => {
  console.log("🚀 ~ Map ~ props:", props);
  // NOTE: In screen components which are configured by plain object syntax (passing an object to
  // createNativeStackNavigator, instead of using <Screen /> inside <Navigator /> such as
  // <Stack.Navigator />, they don't get the navigation object (inside props) passed to them.
  // It remains undefined, and thus gotta use the useNavigation hook to get the navigation prop)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Map">>();
  // const route = useRoute<RouteProp<RootStackParamList, "Map">>();
  // console.log("🚀 ~ Map ~ route:", route);

  const initialLocation = props.route.params?.preSelectedLocation;
  const regionOnMapLoad = {
    latitude: initialLocation?.lat ?? 26.11,
    longitude: initialLocation ? initialLocation.lng : 91.7,
    latitudeDelta: 2,
    longitudeDelta: 2,
  };

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(initialLocation ?? null);

  console.log("🚀 ~ Map ~ selectedLocation:", selectedLocation);

  const onMapPress = (event: MapPressEvent) => {
    if (initialLocation) return;
    // MAP is read-only if we come from PlaceDetails with an initial place.
    console.log(event.nativeEvent); // an object with action: "press", coordinate: {latitude, longitude}, position: {x, y}. Position is the position of the tap on the screen.
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log("🚀 ~ Map ~ latitude | longitude:", latitude, " | ", longitude);
    setSelectedLocation({ lat: latitude, lng: longitude });
  };

  const savePickedLocation = useCallback(() => {
    console.log("Selected location inside savePickedLocation:", selectedLocation);
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!",
        [{ text: "OK" }]
      );
      return;
    }

    const prevScreenKey = props.route.params?.callingScreenKey;
    if (prevScreenKey)
      // Updating the route.params of the previous AddPlace screen via it's unique key
      navigation.dispatch({
        ...CommonActions.setParams({
          pickedLat: selectedLocation.lat,
          pickedLng: selectedLocation.lng,
        }),
        source: prevScreenKey,
      });

    navigation.goBack();
    // navigation.navigate(
    //   "AddPlace",
    //   { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng }
    //   // { merge: true } // Doesn't work for going back to the AddPlace screen with above params
    // );
  }, [navigation, props.route.params?.callingScreenKey, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) return; // If there is an already selected location from PlaceDetails.
    navigation.setOptions({
      headerRight: (props) => {
        return <IconButton icon="save" color={props.tintColor} onPress={savePickedLocation} />;
      },
    });
  }, [initialLocation, navigation, savePickedLocation]);

  return (
    <MapView
      initialRegion={regionOnMapLoad}
      style={styles.map}
      onPress={onMapPress}
      // provider={PROVIDER_GOOGLE}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
        />
      )}
    </MapView>
  );
};

export default Map;
