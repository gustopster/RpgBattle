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
import { SafeAreaView } from "react-native-safe-area-context";
import { battleService } from "../services/battleService";
import { BattleCard } from "../components/BattleCard";
import { Battle } from "../types/battle";

export function BattleScreen() {
  const [data, setData] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Carregar tema salvo
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

  // Persistir tema
  useEffect(() => {
    AsyncStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const loadBattles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await battleService.getBattles();
      setData(response);
    } catch (e: any) {
      console.log("Erro ao conectar na API:", e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
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
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />

      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={[styles.title, { color: textColor }]}>
          RPG Battle Mobile 🚀
        </Text>

        {loading && (
          <Text style={[styles.loading, { color: textColor }]}>
            Carregando batalhas...
          </Text>
        )}

        {!loading && data.length === 0 && (
          <Text style={[styles.loading, { color: textColor }]}>
            Nenhuma batalha encontrada.
          </Text>
        )}

        {data.map((battle) => (
          <BattleCard
            key={battle.id}
            battle={battle}
            cardColor={cardColor}
            textColor={textColor}
          />
        ))}
      </ScrollView>

      {/* BOTÃO FLUTUANTE */}
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
    paddingBottom: 100,
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
  },
});
