import { Alert, StyleSheet, View, Image, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { useEffect, useState } from "react";
import { getAddressFromCoordinates, getMapPreview } from "../../util/location";
import { RouteProp, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LocationCoordinates, LocationCoordsWithAddress, RootStackParamList } from "../../../types";

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    aspectRatio: 16 / 9, // As the image is in 16 / 9
    // height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden", // For the image's sharp corners to be hidden.
    // Alternately add borderRadius: 4 to mapPreviewImage below
  },
  mapPreviewImage: { width: "100%", height: "100%", objectFit: "cover" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

interface LocationPickerProps {
  onPickLocation: (locationWithAddress: LocationCoordsWithAddress | null) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onPickLocation }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "AddPlace">>();

  const isFocused = useIsFocused();

  const [locationPermissionInfo, requestPermission] = useForegroundPermissions();
  //   const [pickedLocation, setPickedLocation] = useState<[number, number] | null>(null);
  const [pickedLocation, setPickedLocation] = useState<LocationCoordinates | null>(null);

  const verifyPermissions = async () => {
    if (locationPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      // NOTE: Unlike image-picker's camera, here requestPermission is required for both iOS and Android, in order to bring up the dialog.
      return permissionResponse.granted;
    }

    if (locationPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app.",
        [{ text: "OK" }]
      );
      return false;
    }

    return true; // locationPermissionInfo.status === PermissionStatus.GRANTED already
  };

  const getLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    console.log("🚀 ~ getLocation ~ location:", JSON.stringify(location, null, 2));
    // setPickedLocation([location.coords.latitude, location.coords.latitude]);
    setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
  };

  const pickOnMap = () => {
    navigation.navigate("Map", { callingScreenKey: route.key });
  };

  useEffect(() => {
    // RUN when location is coming from Map screen in the form of route params
    console.log("🚀 ~ LocationPicker ~ route:", route, "isFocused:", isFocused);
    if (isFocused && route.params) {
      // const mapPickedLocation = route.params
      //   ? { lat: route.params.pickedLat, lng: route.params.pickedLng }
      //   : null;
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [isFocused, route]);

  useEffect(() => {
    // NOTE: This is to run every time the pickedLocation local state changes, so as to update the
    // state in the parent PlaceForm, via the onPickLocation prop.
    const setLocationInPlaceForm = async () => {
      if (pickedLocation) {
        const address = await getAddressFromCoordinates(pickedLocation.lat, pickedLocation.lng);
        onPickLocation({ ...pickedLocation, address: address });
      }
    };
    setLocationInPlaceForm();
  }, [pickedLocation, onPickLocation]);

  const locationPreview = pickedLocation ? (
    <Image
      source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      style={styles.mapPreviewImage}
    />
  ) : (
    <Text>No location picked yet.</Text>
  );

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocation}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMap}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;
