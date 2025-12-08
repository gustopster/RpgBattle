import { useEffect } from "react";
import { Text, View } from "react-native";
import { api } from "./src/services/api";

export default function App() {
  useEffect(() => {
    api.get("/api/Battles")
      .then(response => {
        console.log("API conectada com sucesso!", response);
      })
      .catch(error => {
        console.log("Erro ao conectar na API:", error.message);
      });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>RPG Battle Mobile 🚀</Text>
    </View>
  );
}
