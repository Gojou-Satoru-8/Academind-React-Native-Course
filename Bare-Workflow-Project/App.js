import { useForegroundPermissions, PermissionStatus, getCurrentPositionAsync } from "expo-location";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [permissionDetails, requestPermission] = useForegroundPermissions();

  const verifyPermission = async () => {
    if (permissionDetails.status === PermissionStatus.GRANTED) return true;

    if (permissionDetails.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestPermission();
      return permission.granted;
    }

    if (permissionDetails.status === PermissionStatus.DENIED) return false;
  };

  const getLocation = async (event) => {
    console.log(event.nativeEvent);
    console.log("CURRENT STATUS: ", permissionDetails.status);
    const permissionGranted = verifyPermission();
    console.log("🚀 ~ getLocation ~ permissionGranted:", permissionGranted);

    if (permissionGranted) {
      const location = await getCurrentPositionAsync();
      console.log("🚀 ~ getLocation ~ location:", location);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <Text>Hello World</Text>
      <Button title="Get Loc" onPress={getLocation} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
