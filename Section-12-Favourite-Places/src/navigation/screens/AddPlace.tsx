import PlaceForm from "../../components/Places/PlaceForm";
import { Place } from "../../models/Place";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { PlaceDB, RootStackParamList } from "../../../types";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { insertPlaceToDB } from "../../util/database";
import { Alert } from "react-native";

type AddPlaceProps = NativeStackScreenProps<RootStackParamList, "AddPlace">;

const AddPlace: React.FC<AddPlaceProps> = ({ route }) => {
  console.log("🚀 ~ AddPlace ~ route:", route);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const insertPlace = async (place: Omit<Place, "id">) => {
    // navigation.navigate("AllPlaces", { place });
    // if (route.params?.callingScreenKey) {
    //   const prevScreenKey = route.params.callingScreenKey;
    //   navigation.dispatch({
    //     ...CommonActions.setParams({ place }),
    //     source: prevScreenKey,
    //   });
    //   navigation.goBack();
    // }
    // Add to on-device database
    try {
      const result = await insertPlaceToDB(place);
      // NOTE: lastInsertRowId is non-zero integer
      if (result.lastInsertRowId) navigation.goBack(); // Go back to all places
    } catch (error) {
      console.log("🚀 ~ insertPlace ~ error:", error);
      if (error instanceof Error) Alert.alert("Unable to insert place", error.message);
    }
  };

  return <PlaceForm insertPlace={insertPlace} />;
};

export default AddPlace;
