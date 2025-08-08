import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { AuthCredentials } from "../types";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useAuthContext } from "../store/context";

function SignUpScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useAuthContext();
  const signUpHandler = async (credentials: AuthCredentials) => {
    setIsAuthenticating(true);
    try {
      const responseData = await createUser(credentials);
      authContext.authenticate(
        responseData.idToken,
        Date.now() + +responseData.expiresIn * 1000,
        responseData.refreshToken
      );
    } catch (error) {
      const err = error as AxiosError;
      console.log("🚀 ~ signUpHandler ~ err:", JSON.stringify(err, null, 2));
      Alert.alert(
        "Signup failed",
        "Could not create account! Please check your input and try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) return <LoadingOverlay message={"Creating your account..."} />;
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignUpScreen;
