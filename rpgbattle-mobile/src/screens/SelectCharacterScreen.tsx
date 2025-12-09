import { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getCharacters } from "../services/characterService";
import { CharacterCard } from "../components/CharacterCard";
import { Character } from "../types/character";
import { useTheme } from "../theme/ThemeContext";

export function SelectCharacterScreen({ route, navigation }: any) {
  const { user } = route.params;
  const [characters, setCharacters] = useState<Character[]>([]);

  const { backgroundColor, cardColor, textColor } = useTheme(); // ✅ tema global

  useEffect(() => {
    getCharacters().then(setCharacters);
  }, []);

  function handleSelect(character: Character) {
    navigation.navigate("CreateBattle", {
      user,
      character,
    });
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: textColor }]}>
          {user.nickname}, escolha seu personagem
        </Text>

        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onSelect={handleSelect}
            cardColor={cardColor}
            textColor={textColor}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // ✅ evita a parte branca embaixo
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
