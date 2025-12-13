import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

import { LoginScreen } from "./src/screens/LoginScreen";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";

const Stack = createNativeStackNavigator();

function Routes() {
  const { darkMode, backgroundColor, textColor } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />

      <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName="Login" // Login agora é a primeira tela
          screenOptions={{
            headerStyle: { backgroundColor },
            headerTintColor: textColor,
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}
