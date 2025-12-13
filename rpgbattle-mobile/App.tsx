import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

import { LoginScreen } from "./src/screens/LoginScreen";

import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { BattleClass } from "./src/screens/BattleClass";
import { AccountSwitcherModal } from "./src/components/AccountSwitcherModal";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  const { darkMode, backgroundColor, textColor } = useTheme();
  const { activeUser, loading } = useAuth();

  if (loading) {
    return null; // depois pode virar splash
  }

  return (
    <>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />
      <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
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
          <Stack.Screen
            name="BattleClass"
            component={BattleClass}
            options={{ title: "Battle Class" }}
          />
        </Stack.Navigator>
        <AccountSwitcherModal />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
