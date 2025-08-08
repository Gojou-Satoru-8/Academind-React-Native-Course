import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthCredentials } from "../types";
import { login } from "../util/auth";
import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useAuthContext } from "../store/context";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useAuthContext();
  const loginHandler = async (credentials: AuthCredentials) => {
    setIsAuthenticating(true);
    try {
      const responseData = await login(credentials);
      authContext.authenticate(
        responseData.idToken,
        Date.now() + +responseData.expiresIn * 1000,
        responseData.refreshToken
      );
    } catch (error) {
      const err = error as AxiosError;
      console.log("🚀 ~ loginHandler ~ err:", JSON.stringify(err, null, 2));
      Alert.alert(
        "Authentication failed",
        "Could not log you in! Please check your credentials or try again later!"
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) return <LoadingOverlay message={"Logging you in..."} />;
  return <AuthContent onAuthenticate={loginHandler} isLogin />;
};

export default LoginScreen;
