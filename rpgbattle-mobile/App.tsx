import { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  StatusBar,
  Appearance,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./src/services/api";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Battle {
  id: number;
  player1Id: number;
  player2Id?: number | null;

  player1Hp: number;
  player2Hp: number;

  turnUserId: number;
  status: string;

  createdAt: string;
  finishedAt?: string | null;
  turnStartedAt?: string | null;
  expiresAt?: string | null;
}

export default function App() {
  const [data, setData] = useState<Partial<Battle>[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Carregar preferência salva ou pegar do sistema
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("darkMode");
      if (savedTheme !== null) {
        setDarkMode(savedTheme === "true");
      } else {
        setDarkMode(Appearance.getColorScheme() === "dark");
      }
    };
    loadTheme();
  }, []);

  // Salvar preferência quando mudar
  useEffect(() => {
    AsyncStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const loadBattles = useCallback(() => {
    setLoading(true);
    api
      .get("/api/Battles")
      .then((response) => setData(response.data))
      .catch((error) => console.log("Erro ao conectar na API:", error.message))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    loadBattles();
  }, [loadBattles]);

  const onRefresh = () => {
    setRefreshing(true);
    loadBattles();
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const backgroundColor = darkMode ? "#000" : "#fff";
  const cardColor = darkMode ? "#1a1a1a" : "#f0f0f0";
  const textColor = darkMode ? "#fff" : "#000";

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {/* Configura StatusBar corretamente */}
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />

      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={[styles.title, { color: textColor }]}>RPG Battle Mobile 🚀</Text>

        {loading && <Text style={[styles.loading, { color: textColor }]}>Carregando batalhas...</Text>}

        {!loading && data.length === 0 && (
          <Text style={[styles.loading, { color: textColor }]}>Nenhuma batalha encontrada.</Text>
        )}

        {data.map((battle) => (
          <View key={String(battle.id)} style={[styles.card, { backgroundColor: cardColor }]}>
            <Text style={[styles.field, { color: textColor }]}>ID: {String(battle.id)}</Text>
            <Text style={[styles.field, { color: textColor }]}>Status: {battle.status}</Text>
            <Text style={[styles.field, { color: textColor }]}>Player1 HP: {battle.player1Hp}</Text>
            <Text style={[styles.field, { color: textColor }]}>
              Player2 HP: {battle.player2Hp !== undefined ? battle.player2Hp : "-"}
            </Text>
            <Text style={[styles.field, { color: textColor }]}>Turn User ID: {String(battle.turnUserId)}</Text>
            <Text style={[styles.field, { color: textColor }]}>
              Criada em: {battle.createdAt ? new Date(battle.createdAt).toLocaleString() : "-"}
            </Text>
            {battle.expiresAt && (
              <Text style={[styles.field, { color: textColor }]}>
                Expira em: {new Date(battle.expiresAt).toLocaleString()}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Floating button no canto inferior direito */}
      <TouchableOpacity
        onPress={toggleDarkMode}
        style={[styles.fab, { backgroundColor: cardColor }]}
        activeOpacity={0.8}
      >
        <Text style={{ color: textColor, fontWeight: "bold" }}>
          {darkMode ? "☀️" : "🌙"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 100, // espaço para o botão flutuante
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 15,
  },
  loading: {
    fontSize: 16,
    marginVertical: 10,
  },
  card: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  field: {
    fontSize: 16,
    marginBottom: 5,
  },
  fab: {
    position: "absolute",
    bottom: 60,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
