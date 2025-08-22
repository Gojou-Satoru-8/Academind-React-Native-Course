import { createContext, useCallback, useContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../types";

type AuthContextType = {
  //   email: string;
  //   idToken: string;
  //   localId: string;
  token: string | null;
  expiryDateTime: number | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string, expiryDateTime: number, refreshToken?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  //   email: "",
  //   idToken: "",
  //   localId: "",
  token: null,
  expiryDateTime: null,
  refreshToken: null,
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

// type AuthReducerState = string | null;  // token type
// type AuthReducerState = AuthContextType["token"];
type AuthReducerState = Pick<AuthContextType, "token" | "expiryDateTime" | "refreshToken">;
type AuthenticateReducerAction = {
  type: "SET_TOKEN";
  payload: { token: string; expiryDateTime: number; refreshToken: string | null };
};
type LogoutReducerAction = { type: "UNSET_TOKEN" };
type AuthReducerAction = AuthenticateReducerAction | LogoutReducerAction;
const authReducer: React.Reducer<AuthReducerState, AuthReducerAction> = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      // return { token: action.payload.token, expiresInTime: action.payload.expiresInTime };
      return { ...action.payload };
    // break;
    case "UNSET_TOKEN":
      return { token: null, expiryDateTime: null, refreshToken: null };
    default:
      return state;
  }
};

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  // const [token, setToken] = useState<string | null>(null);
  // const [expiresInTime, setExpiresInTime] = useState<number | null>(null);
  // Reducer is an overkill for this purpose
  const [authState, dispatch] = useReducer(authReducer, {
    token: null,
    expiryDateTime: null,
    refreshToken: null,
  });

  const authenticate = useCallback(
    (token: string, expiryDateTime: number, refreshToken?: string) => {
      AsyncStorage.setItem(AsyncStorageKeys.TOKEN, token);
      AsyncStorage.setItem(AsyncStorageKeys.EXPIRY_DATETIME, expiryDateTime.toString());
      if (refreshToken) AsyncStorage.setItem(AsyncStorageKeys.REFRESH_TOKEN, refreshToken);
      // setToken(token);
      dispatch({
        type: "SET_TOKEN",
        payload: { token, expiryDateTime, refreshToken: refreshToken || null },
      });
    },
    []
  );

  const logout = useCallback(() => {
    // AsyncStorage.removeItem(AsyncStorageKeys.TOKEN);
    // AsyncStorage.removeItem(AsyncStorageKeys.EXPIRY_DATETIME);
    // AsyncStorage.removeItem(AsyncStorageKeys.REFRESH_TOKEN);
    // OR:
    AsyncStorage.multiRemove([
      AsyncStorageKeys.TOKEN,
      AsyncStorageKeys.EXPIRY_DATETIME,
      AsyncStorageKeys.REFRESH_TOKEN,
    ]);
    // setToken(null);
    dispatch({ type: "UNSET_TOKEN" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: authState.token,
        refreshToken: authState.token,
        expiryDateTime: authState.expiryDateTime,
        isAuthenticated: !!authState.token, // token? true: false
        authenticate,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
export default AuthContextProvider;
