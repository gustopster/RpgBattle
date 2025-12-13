import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { LoginScreen } from "./src/screens/LoginScreen";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { BattleClass } from "./src/screens/BattleClass";
import { RootStackParamList } from "./src/types/navigation";
import { AccountSwitcherModal } from "./src/components/AccountSwitcherModal";

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  const { darkMode, backgroundColor, textColor } = useTheme();
  const { activeUser, loading, loginMode } = useAuth();

  if (loading) {
    return null; // splash futuramente
  }

  return (
    <>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />

      <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
        {activeUser ? (
          /* 🔒 APP LOGADO */
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor },
              headerTintColor: textColor,
            }}
          >
            <Stack.Screen
              name="BattleClass"
              component={BattleClass}
              options={{ title: "Battle Class" }}
            />
          </Stack.Navigator>
        ) : (
          /* 🔓 AUTH */
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor },
              headerTintColor: textColor,
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              initialParams={{ mode: loginMode }}
            />

          </Stack.Navigator>
        )}

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
