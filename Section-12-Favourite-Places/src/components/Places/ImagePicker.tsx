import { Alert, Button, View, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  ImagePickerResult,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    aspectRatio: 16 / 9, // As the image is in 16 / 9
    // height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden", // For the image's sharp corners to be hidden.
    // Alternately add borderRadius: 4 to image below
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  // Here cover and contain shouldn't make any difference, as the imagePreview container is
  // commodating the full width of the image and also has an aspect ratio of 16 / 9
});

interface ImagePickerProps {
  onTakeImage: (imageUri: string | null) => void;
}
const ImagePicker: React.FC<ImagePickerProps> = ({ onTakeImage }) => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState<ImagePickerResult | null>(null);

  const verifyPermissions = async () => {
    if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
      const persmissionResponse = await requestPermission();
      // NOTE: requestPermission() is required explicitly for iOS only, in order to bring up the
      // dialog. For android, simply calling launchCameraAsync() brings up the popup
      return persmissionResponse.granted;
    }

    if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app.",
        [{ text: "OK" }]
      );
      return false;
    }

    return true; // .status === PermissionStatus.GRANTED already
  };

  const captureImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    }); // This function waits for the user to tap the capture button, and once the image is captured and can be previewed, it can be saved.
    console.log("🚀 ~ captureImage ~ image:", JSON.stringify(image, null, 2));
    setPickedImage(image);
    onTakeImage(image.assets?.at(0)?.uri || null);
  };

  // If no image taken, pickedImage is null | If cancelled while taking, then pickedImage.assets = null | If image taken, then pickedImage.assets is an array of objects
  const imagePreview = pickedImage?.assets ? (
    <Image source={{ uri: pickedImage.assets.at(0)?.uri }} style={styles.image} />
  ) : (
    <Text>No image taken yet</Text>
  );

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      {/* <Button title="Take Image" onPress={captureImage} /> */}
      <OutlinedButton icon="camera" onPress={captureImage}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;
