import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { loginUser } from "../services/userService";
import { useTheme } from "../theme/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ route, navigation }: Props) {
  const [nickname, setNickname] = useState("");

  const { backgroundColor, cardColor, textColor } = useTheme();
  const { addAccount } = useAuth();

  const mode = route.params?.mode ?? "login";

  async function handleLogin() {

    try {
      const user = await loginUser(nickname.trim());

      if (!user) {
        Alert.alert("Erro", "Usuário não encontrado");
        return;
      }

      await addAccount(user);

      navigation.replace("BattleClass");
    } catch {
      Alert.alert("Erro", "Falha ao realizar login");
    }
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        {mode === "add" ? "Adicionar conta" : "Login"}
      </Text>

      <TextInput
        style={[
          styles.input,
          { backgroundColor: cardColor, color: textColor },
        ]}
        placeholder="Digite seu nickname"
        placeholderTextColor="#aaa"
        value={nickname}
        onChangeText={text => setNickname(text.trim())}
        autoCapitalize="none"
      />

      <Button
        title={mode === "add" ? "Adicionar" : "Entrar"}
        onPress={handleLogin}
      />
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
