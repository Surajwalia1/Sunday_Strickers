import * as mongoService from "./playerService";
import * as jsonService from "./jsonPlayerService";

// Check if MongoDB is available
let isMongoAvailable = false;

async function checkMongoConnection(): Promise<boolean> {
  try {
    await mongoService.getAllPlayers();
    isMongoAvailable = true;
    console.log("✅ MongoDB is available - using MongoDB storage");
    return true;
  } catch (error) {
    isMongoAvailable = false;
    console.log("⚠️  MongoDB not available - falling back to JSON storage");
    console.log(
      "ℹ️  To enable MongoDB, follow the setup guide in MONGODB_SETUP.md",
    );
    return false;
  }
}

// Initialize and check storage
export async function initializeStorage() {
  await checkMongoConnection();
}

// Export unified interface
export async function getAllPlayers() {
  if (isMongoAvailable) {
    try {
      return await mongoService.getAllPlayers();
    } catch (error) {
      console.log("MongoDB error, falling back to JSON:", error);
      isMongoAvailable = false;
      return await jsonService.getAllPlayers();
    }
  }
  return await jsonService.getAllPlayers();
}

export async function getPlayerById(id: string) {
  if (isMongoAvailable) {
    try {
      return await mongoService.getPlayerById(id);
    } catch (error) {
      console.log("MongoDB error, falling back to JSON:", error);
      isMongoAvailable = false;
      return await jsonService.getPlayerById(id);
    }
  }
  return await jsonService.getPlayerById(id);
}

export async function addPlayer(
  playerData: Parameters<typeof mongoService.addPlayer>[0],
) {
  if (isMongoAvailable) {
    try {
      return await mongoService.addPlayer(playerData);
    } catch (error) {
      console.log("MongoDB error, falling back to JSON:", error);
      isMongoAvailable = false;
      return await jsonService.addPlayer(playerData);
    }
  }
  return await jsonService.addPlayer(playerData);
}

export async function updatePlayer(
  id: string,
  playerData: Parameters<typeof mongoService.updatePlayer>[1],
) {
  if (isMongoAvailable) {
    try {
      return await mongoService.updatePlayer(id, playerData);
    } catch (error) {
      console.log("MongoDB error, falling back to JSON:", error);
      isMongoAvailable = false;
      return await jsonService.updatePlayer(id, playerData);
    }
  }
  return await jsonService.updatePlayer(id, playerData);
}

export async function deletePlayer(id: string) {
  if (isMongoAvailable) {
    try {
      return await mongoService.deletePlayer(id);
    } catch (error) {
      console.log("MongoDB error, falling back to JSON:", error);
      isMongoAvailable = false;
      return await jsonService.deletePlayer(id);
    }
  }
  return await jsonService.deletePlayer(id);
}

export async function getPlayersByTeam(
  team: Parameters<typeof mongoService.getPlayersByTeam>[0],
) {
  if (isMongoAvailable) {
    try {
      return await mongoService.getPlayersByTeam(team);
    } catch (error) {
      console.log("MongoDB error, falling back to JSON:", error);
      isMongoAvailable = false;
      return await jsonService.getPlayersByTeam(team);
    }
  }
  return await jsonService.getPlayersByTeam(team);
}

export async function getPlayersByPosition(
  position: Parameters<typeof mongoService.getPlayersByPosition>[0],
) {
  if (isMongoAvailable) {
    try {
      return await mongoService.getPlayersByPosition(position);
    } catch (error) {
      console.log("MongoDB error, falling back to JSON:", error);
      isMongoAvailable = false;
      return await jsonService.getPlayersByPosition(position);
    }
  }
  return await jsonService.getPlayersByPosition(position);
}

// Export types
export type { PlayerData } from "./playerService";
