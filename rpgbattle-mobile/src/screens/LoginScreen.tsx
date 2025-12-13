import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { loginUser } from "../services/userService";
import { useTheme } from "../theme/ThemeContext";

export function LoginScreen() {
  const [nickname, setNickname] = useState("");
  const { backgroundColor, cardColor, textColor } = useTheme();

  const handleLogin = async () => {

    const user = await loginUser(nickname);
    if (!user) {
      Alert.alert("Erro", "Usuário não encontrado");
      return;
    }

    console.log(user);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Login</Text>
      <TextInput
        style={[styles.input, { backgroundColor: cardColor, color: textColor }]}
        placeholder="Digite seu nickname"
        placeholderTextColor="#aaa"
        value={nickname}
        onChangeText={(e) => setNickname(e.trim())}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});
