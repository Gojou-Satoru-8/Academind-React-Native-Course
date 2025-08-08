import axios from "axios";
import { AuthCredentials, AuthRefreshResponse, AuthResponse } from "../types";

const API_KEY = "AIzaSyA6CI08maSY-074Q_GuDKWQrKPARKFTw-M";

const axiosInstance = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
  params: { key: API_KEY },
});

const enum ENDPOINTS {
  SIGNUP = "accounts:signUp",
  SIGNIN = "accounts:signInWithPassword",
}

export const authenticate = async (endpoint: ENDPOINTS, credentials: AuthCredentials) => {
  // NOTE: Assigning an enum as a type, simply means a union of all the literal values the ENUM may
  // hold. Here, it is: "accounts:signUp" | "accounts:signInWithPassword"

  //   const response = await axios.post(
  //     `https://identitytoolkit.googleapis.com/v1/accounts/${endpoint}?key=${API_KEY}`,
  //     { ...credentials, returnSecureToken: true }
  //   );
  const response = await axiosInstance.post<AuthResponse>(endpoint, {
    ...credentials,
    returnSecureToken: true,
  });
  console.log(`🚀 ~ authenticate | ${endpoint} ~ response:`, JSON.stringify(response, null, 2));
  return response.data;
  // For signUp:"kind": "identitytoolkit#SignupNewUserResponse",
  // For signInWithPassword: "kind": "identitytoolkit#VerifyPasswordResponse",
};

export const createUser = (credentials: AuthCredentials) => {
  return authenticate(ENDPOINTS.SIGNUP, credentials);
};

export const login = (credentials: AuthCredentials) => {
  return authenticate(ENDPOINTS.SIGNIN, credentials);
};

export const extendSession = async (refreshToken: string) => {
  const response = await axios.post<AuthRefreshResponse>(
    `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
    {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }
  );
  console.log("🚀 ~ refreshToken ~ responseData:", response.data);
  return response.data;
};
