import { Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";

export function BattleScreen() {
  const { backgroundColor, textColor } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView>
        <Text style={{ color: textColor }}>Tela de lista de batalhas</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
