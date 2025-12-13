import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";

export function BattleClass() {
  const { backgroundColor, cardColor, textColor } = useTheme();
  const { activeUser, openAccountModal } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* BOTÃO DE CONTAS */}
      <TouchableOpacity
        onPress={openAccountModal}
        style={styles.accountButton}
        activeOpacity={0.7}
      >
        <Text style={[styles.accountText, { color: textColor }]}>
          Menu
        </Text>
      </TouchableOpacity>


      {/* CARD PRINCIPAL */}
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[styles.title, { color: textColor }]}>
          Bem-vindo à Arena
        </Text>

        <Text style={[styles.subtitle, { color: textColor }]}>
          Player: {activeUser?.nickname}
        </Text>

        <Text style={[styles.info, { color: textColor }]}>
          Escolha seu personagem para liberar a batalha.
        </Text>

        <Button title="Encontrar Batalha" disabled onPress={() => { }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    padding: 20,
    borderRadius: 12,
    gap: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
  },

  info: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
  },

  accountButton: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 10,
  },

  accountText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 3,
    borderRadius: 12,
    borderColor: "#fff",
  },

});
