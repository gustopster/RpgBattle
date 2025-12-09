import { View, Text, StyleSheet } from "react-native";
import { Battle } from "../types/battle";

interface Props {
  battle: Battle;
  cardColor: string;
  textColor: string;
}

export function BattleCard({ battle, cardColor, textColor }: Props) {
  return (
    <View style={[styles.card, { backgroundColor: cardColor }]}>
      <Text style={[styles.field, { color: textColor }]}>ID: {battle.id}</Text>
      <Text style={[styles.field, { color: textColor }]}>Status: {battle.status}</Text>
      <Text style={[styles.field, { color: textColor }]}>Player1 HP: {battle.player1Hp}</Text>
      <Text style={[styles.field, { color: textColor }]}>
        Player2 HP: {battle.player2Hp ?? "-"}
      </Text>
      <Text style={[styles.field, { color: textColor }]}>
        Turn User ID: {battle.turnUserId}
      </Text>
      <Text style={[styles.field, { color: textColor }]}>
        Criada em: {new Date(battle.createdAt).toLocaleString()}
      </Text>

      {battle.expiresAt && (
        <Text style={[styles.field, { color: textColor }]}>
          Expira em: {new Date(battle.expiresAt).toLocaleString()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
