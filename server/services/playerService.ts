import { Player, IPlayer } from "../models/Player";
import { connectToDatabase } from "../config/database";

export interface PlayerData {
  id?: string;
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
  team: "Tharki Tigers" | "Nange Shikari" | "None";
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

// Ensure database connection before operations
const ensureConnection = async () => {
  await connectToDatabase();
};

// Get all players
export async function getAllPlayers(): Promise<PlayerData[]> {
  try {
    await ensureConnection();
    const players = await Player.find({}).sort({ createdAt: 1 });
    return players.map((player) => player.toJSON() as PlayerData);
  } catch (error) {
    console.error("Error fetching players:", error);
    throw new Error("Failed to fetch players from database");
  }
}

// Get player by ID
export async function getPlayerById(id: string): Promise<PlayerData | null> {
  try {
    await ensureConnection();
    const player = await Player.findById(id);
    return player ? (player.toJSON() as PlayerData) : null;
  } catch (error) {
    console.error("Error fetching player by ID:", error);
    throw new Error("Failed to fetch player from database");
  }
}

// Add new player
export async function addPlayer(
  playerData: Omit<PlayerData, "id">,
): Promise<PlayerData> {
  try {
    await ensureConnection();

    // Ensure positionDisplay is set correctly
    if (!playerData.positionDisplay) {
      playerData.positionDisplay = playerData.position
        .toLowerCase()
        .replace("_", " ");
    }

    const newPlayer = new Player(playerData);
    const savedPlayer = await newPlayer.save();
    return savedPlayer.toJSON() as PlayerData;
  } catch (error) {
    console.error("Error adding player:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to add player: ${error.message}`);
    }
    throw new Error("Failed to add player to database");
  }
}

// Update existing player
export async function updatePlayer(
  id: string,
  playerData: Partial<PlayerData>,
): Promise<PlayerData | null> {
  try {
    await ensureConnection();

    // Ensure positionDisplay is updated if position changes
    if (playerData.position && !playerData.positionDisplay) {
      playerData.positionDisplay = playerData.position
        .toLowerCase()
        .replace("_", " ");
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      { ...playerData, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    return updatedPlayer ? (updatedPlayer.toJSON() as PlayerData) : null;
  } catch (error) {
    console.error("Error updating player:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update player: ${error.message}`);
    }
    throw new Error("Failed to update player in database");
  }
}

// Delete player
export async function deletePlayer(id: string): Promise<boolean> {
  try {
    await ensureConnection();
    const result = await Player.findByIdAndDelete(id);
    return result !== null;
  } catch (error) {
    console.error("Error deleting player:", error);
    throw new Error("Failed to delete player from database");
  }
}

// Get players by team
export async function getPlayersByTeam(
  team: "Tharki Tigers" | "Nange Shikari" | "None",
): Promise<PlayerData[]> {
  try {
    await ensureConnection();
    const players = await Player.find({ team }).sort({ createdAt: 1 });
    return players.map((player) => player.toJSON() as PlayerData);
  } catch (error) {
    console.error("Error fetching players by team:", error);
    throw new Error("Failed to fetch team players from database");
  }
}

// Get players by position
export async function getPlayersByPosition(
  position: PlayerData["position"],
): Promise<PlayerData[]> {
  try {
    await ensureConnection();
    const players = await Player.find({ position }).sort({ createdAt: 1 });
    return players.map((player) => player.toJSON() as PlayerData);
  } catch (error) {
    console.error("Error fetching players by position:", error);
    throw new Error("Failed to fetch position players from database");
  }
}

// Migration function to import existing JSON data to MongoDB
export async function migrateFromJSONToMongoDB(
  jsonData: PlayerData[],
): Promise<void> {
  try {
    await ensureConnection();

    // Clear existing data
    await Player.deleteMany({});

    // Insert JSON data
    for (const playerData of jsonData) {
      const { id, ...dataWithoutId } = playerData;
      await addPlayer(dataWithoutId);
    }

    console.log(
      `✅ Successfully migrated ${jsonData.length} players to MongoDB`,
    );
  } catch (error) {
    console.error("Error migrating data:", error);
    throw new Error("Failed to migrate data to MongoDB");
  }
}
