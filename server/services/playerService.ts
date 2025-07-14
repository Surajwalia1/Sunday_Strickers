import fs from "fs/promises";
import path from "path";

export interface Player {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  nickname: string;
  position:
    | "GOALKEEPERS"
    | "DEFENDERS"
    | "MIDFIELDERS"
    | "FORWARDS"
    | "COACHING STAFF";
  positionDisplay: string;
  team: "Team A" | "Team B";
  jerseyNumber?: string;
  photo: string;
  bio: string;
  appearances: number;
  goals: number;
  saves?: number;
  cleanSheets?: number;
  funFact: string;
  quote: string;
}

const DATA_FILE = path.join(process.cwd(), "server", "data", "players.json");

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read players from file
export async function getAllPlayers(): Promise<Player[]> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading players data:", error);
    return [];
  }
}

// Write players to file
async function savePlayers(players: Player[]): Promise<void> {
  try {
    await ensureDataDirectory();
    await fs.writeFile(DATA_FILE, JSON.stringify(players, null, 2));
  } catch (error) {
    console.error("Error saving players data:", error);
    throw error;
  }
}

// Get player by ID
export async function getPlayerById(id: string): Promise<Player | null> {
  const players = await getAllPlayers();
  return players.find((player) => player.id === id) || null;
}

// Add new player
export async function addPlayer(
  playerData: Omit<Player, "id">,
): Promise<Player> {
  const players = await getAllPlayers();
  const newPlayer: Player = {
    ...playerData,
    id: Date.now().toString(),
  };

  players.push(newPlayer);
  await savePlayers(players);
  return newPlayer;
}

// Update existing player
export async function updatePlayer(
  id: string,
  playerData: Partial<Player>,
): Promise<Player | null> {
  const players = await getAllPlayers();
  const playerIndex = players.findIndex((player) => player.id === id);

  if (playerIndex === -1) {
    return null;
  }

  players[playerIndex] = { ...players[playerIndex], ...playerData, id };
  await savePlayers(players);
  return players[playerIndex];
}

// Delete player
export async function deletePlayer(id: string): Promise<boolean> {
  const players = await getAllPlayers();
  const filteredPlayers = players.filter((player) => player.id !== id);

  if (filteredPlayers.length === players.length) {
    return false; // Player not found
  }

  await savePlayers(filteredPlayers);
  return true;
}

// Get players by team
export async function getPlayersByTeam(
  team: "Team A" | "Team B",
): Promise<Player[]> {
  const players = await getAllPlayers();
  return players.filter((player) => player.team === team);
}

// Get players by position
export async function getPlayersByPosition(
  position: Player["position"],
): Promise<Player[]> {
  const players = await getAllPlayers();
  return players.filter((player) => player.position === position);
}
