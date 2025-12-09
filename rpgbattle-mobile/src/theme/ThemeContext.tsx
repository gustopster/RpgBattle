import { createContext, useContext, useEffect, useState } from "react";
import {
  Appearance,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextData {
  darkMode: boolean;
  toggleTheme: () => void;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
}

const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem("darkMode");

      if (saved !== null) {
        setDarkMode(saved === "true");
      } else {
        setDarkMode(Appearance.getColorScheme() === "dark");
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((prev) => !prev);
  }

  const backgroundColor = darkMode ? "#000" : "#fff";
  const cardColor = darkMode ? "#1a1a1a" : "#f0f0f0";
  const textColor = darkMode ? "#fff" : "#000";

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
        backgroundColor,
        cardColor,
        textColor,
      }}
    >
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />

      {children}

      {/* ✅ BOTÃO GLOBAL — EXISTE UMA ÚNICA VEZ */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          styles.fab,
          { backgroundColor: cardColor } // ❌ removeu borderColor
        ]}
        activeOpacity={0.8}
      >
        <Text style={{ color: textColor, fontSize: 18 }}>
          {darkMode ? "☀️" : "🌙"}
        </Text>
      </TouchableOpacity>

    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
});
