import { DrawerScreenProps } from "@react-navigation/drawer";
import { View, Text, Button, StyleSheet } from "react-native";
import { RootParamList } from "../types";

type UserScreenProps = DrawerScreenProps<RootParamList>;

function UserScreen({ route, navigation }: UserScreenProps) {
  console.log("🚀 ~ UserScreen ~ route:", route);
  return (
    <View style={styles.rootContainer}>
      <Text>
        This is the <Text style={styles.highlight}>"User"</Text> screen!
      </Text>
      {/* NOTE: Following only works in Drawer Navigator */}
      {/* <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()} /> */}
    </View>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: "#eb1064",
  },
});
