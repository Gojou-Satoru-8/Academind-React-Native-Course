import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import PlaceDetails from "./screens/PlaceDetails";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import { createStaticNavigation } from "@react-navigation/native";
// import { RootStackParamList } from "../../types";
import IconButton from "../components/UI/IconButton";
import { Colors } from "../constants/colors";

const RootStack = createNativeStackNavigator({
  screens: {
    AllPlaces: {
      screen: AllPlaces,
      options: ({ navigation }) => ({
        // headerTitle: "All Places",
        title: "Your Favourite Places",
        headerRight: (props) => (
          <IconButton
            icon="add"
            color={props.tintColor}
            onPress={() => navigation.navigate("AddPlace")}
          />
        ),
      }),
    },
    PlaceDetails: { screen: PlaceDetails, options: { title: "Loading Place..." } },
    // Here, title is the default title, before place is fetched.
    AddPlace: {
      screen: AddPlace,
      options: {
        title: "Add a new Place",
        presentation: "modal", // Setting this as modal means every successive screen will be modal
      },
    },
    Map: {
      screen: Map,
      options: {
        // presentation: "card",
      },
    },
  },
  screenOptions: {
    headerStyle: { backgroundColor: Colors.primary500 },
    headerTintColor: Colors.gray700,
    contentStyle: { backgroundColor: Colors.gray700 },
  },
});

// In order to infer RootStackParam list from above:
// export type RootStackParamList = StaticParamList<typeof RootStack>;
const Navigation = createStaticNavigation(RootStack);
export default Navigation;
