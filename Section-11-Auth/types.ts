// import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  //   Nothing: string;
};

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, "Signup">;
// export type LoginScreenNavigationProp = NavigationProp<RootStackParamList, "Login">;
// export type RegisterScreenNavigationProp = NavigationProp<RootStackParamList, "Register">;

export type Credentials = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

// type nothing1 = RootStackParamList["Nothing"]; // string (ie returns the type directly)
// type nothing2 = Pick<RootStackParamList, "Nothing">;
// {Nothing: string} (ie returns an object-type with the property Nothing and the type string)
