import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getUsers } from "../services/userService";
import { PlayerSelector } from "../components/PlayerSelector";
import { useTheme } from "../theme/ThemeContext";
import { User } from "../types/uset";

export function HomeScreen({ navigation }: any) {
  const [users, setUsers] = useState<User[]>([]);

  const { backgroundColor, cardColor, textColor } = useTheme(); // ✅ tema global

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  function handleSelectUser(user: User) {
    navigation.navigate("SelectCharacter", { user });
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
    >
      <Text style={[styles.title, { color: textColor }]}>
        Escolha seu Player
      </Text>

      {users.map((user) => (
        <PlayerSelector
          key={user.id}
          user={user}
          onSelect={handleSelectUser}
          cardColor={cardColor}
          textColor={textColor}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
