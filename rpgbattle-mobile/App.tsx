import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

import { HomeScreen } from "./src/screens/HomeScreen";
import { SelectCharacterScreen } from "./src/screens/SelectCharacterScreen";
import { CreateBattleScreen } from "./src/screens/CreateBattleScreen";
import { BattleScreen } from "./src/screens/BattleScreen";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";

const Stack = createNativeStackNavigator();

function Routes() {
  const { darkMode, backgroundColor, textColor } = useTheme();

  return (
    <>
      {/* ✅ STATUS BAR GLOBAL */}
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />

      <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: textColor,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SelectCharacter" component={SelectCharacterScreen} />
          <Stack.Screen name="CreateBattle" component={CreateBattleScreen} />
          <Stack.Screen name="BattleList" component={BattleScreen} />
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
