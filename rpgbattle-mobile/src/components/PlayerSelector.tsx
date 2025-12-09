import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { User } from "../types/uset";

interface Props {
  user: User;
  onSelect: (user: User) => void;
  textColor: string;
  cardColor: string;
}

export function PlayerSelector({ user, onSelect, textColor, cardColor }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardColor }]}
      onPress={() => onSelect(user)}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {user.nickname}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
