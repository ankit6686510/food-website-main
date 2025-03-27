import { createContext } from "react";

const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
});

export default ThemeContext; 