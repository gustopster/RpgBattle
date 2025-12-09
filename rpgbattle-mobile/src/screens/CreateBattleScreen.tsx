import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export function CreateBattleScreen({ route, navigation }: any) {
  const { user, character } = route.params;

  const { backgroundColor, textColor, cardColor } = useTheme(); // ✅ vem do Provider

  function handleCreate() {
    // FUTURO:
    // await battleService.createBattle(...)
    navigation.navigate("BattleList");
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        Confirmar Batalha
      </Text>

      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={{ color: textColor }}>Player: {user.nickname}</Text>
        <Text style={{ color: textColor }}>
          Personagem: {character.name}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleCreate}
        style={[styles.button, { backgroundColor: cardColor }]}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: textColor }]}>
          Criar Sala
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
