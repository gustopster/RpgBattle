import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Character } from "../types/character";

interface Props {
  character: Character;
  onSelect: (character: Character) => void;
  textColor: string;
  cardColor: string;
}

export function CharacterCard({ character, onSelect, textColor, cardColor }: Props) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(character)}
      style={[styles.card, { backgroundColor: cardColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>{character.name}</Text>
      <Text style={{ color: textColor }}>HP: {character.maxHp}</Text>
      <Text style={{ color: textColor }}>Atk: {character.attack}</Text>
      <Text style={{ color: textColor }}>Def: {character.defense}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
