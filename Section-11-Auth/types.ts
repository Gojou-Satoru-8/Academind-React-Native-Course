// import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
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

export type AuthCredentials = Pick<Credentials, "email" | "password">;
export type AuthResponse = {
  kind: string;
  localId: string;
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  registered?: boolean; // Only for signin
  displayName?: string; // Only for signin
};
export type AuthRefreshResponse = {
  id_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: string;
  user_id: string;
  project_id: string;
};

export const enum AsyncStorageKeys {
  TOKEN = "token",
  EXPIRY_DATETIME = "expiryDateTime",
  REFRESH_TOKEN = "refreshToken",
  LAST_USED_DATETIME = "lastUsedDateTime",
}

// type nothing1 = RootStackParamList["Nothing"]; // string (ie returns the type directly)
// type nothing2 = Pick<RootStackParamList, "Nothing">;
// {Nothing: string} (ie returns an object-type with the property Nothing and the type string)
