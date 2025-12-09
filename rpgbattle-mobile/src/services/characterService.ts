import { Character } from "../types/character";

export async function getCharacters(): Promise<Character[]> {
  return [
    { id: 1, name: "Arqueiro", class: "Arqueiro", maxHp: 100, attack: 20, defense: 15 },
    { id: 2, name: "Guerreiro", class: "Guerreiro", maxHp: 120, attack: 18, defense: 20 },
    { id: 3, name: "Mago", class: "Mago", maxHp: 80, attack: 25, defense: 10 },
    { id: 4, name: "Curandeiro", class: "Curandeiro", maxHp: 90, attack: 10, defense: 12 },
  ];
}
