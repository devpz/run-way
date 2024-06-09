import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
  customLight: "customLight",
  customDark: "customDark",
};

interface User {
  username: string;
  email: string;
  token: string;
}

interface UserState {
  user: User | null;
  theme: string;
}

const getUserFromLocalStorage = (): User | null => {
  return JSON.parse(localStorage.getItem("user") as string) || null;
};

const getThemeFromLocalStorage = (): string => {
  const theme = localStorage.getItem("theme") || themes.customLight;
  document.documentElement.setAttribute("data-theme", theme);
  return theme;
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ user: User; jwt: string }>) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
    },
    toggleTheme: (state) => {
      const { customDark, customLight } = themes;
      state.theme = state.theme === customDark ? customLight : customDark;
      document.documentElement.setAttribute("data-theme", state.theme);
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
