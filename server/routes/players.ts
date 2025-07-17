import { Request, Response } from "express";
import {
  getAllPlayers,
  getPlayerById,
  addPlayer,
  updatePlayer,
  deletePlayer,
  PlayerData,
} from "../services/playerService";

// GET /api/players - Get all players
export const handleGetAllPlayers = async (req: Request, res: Response) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
};

// GET /api/players/:id - Get player by ID
export const handleGetPlayerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const player = await getPlayerById(id);

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(player);
  } catch (error) {
    console.error("Error fetching player:", error);
    res.status(500).json({ error: "Failed to fetch player" });
  }
};

// POST /api/players - Add new player
export const handleAddPlayer = async (req: Request, res: Response) => {
  try {
    const playerData = req.body;

    // Basic validation
    if (!playerData.firstName || !playerData.lastName) {
      return res
        .status(400)
        .json({ error: "First name and last name are required" });
    }

    if (!playerData.position || !playerData.team) {
      return res.status(400).json({ error: "Position and team are required" });
    }

    // Ensure positionDisplay is set
    if (!playerData.positionDisplay) {
      playerData.positionDisplay = playerData.position
        .toLowerCase()
        .replace("_", " ");
    }

    const newPlayer = await addPlayer(playerData);
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(500).json({ error: "Failed to add player" });
  }
};

// PUT /api/players/:id - Update player
export const handleUpdatePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const playerData = req.body;

    // Ensure positionDisplay is updated if position changes
    if (playerData.position && !playerData.positionDisplay) {
      playerData.positionDisplay = playerData.position
        .toLowerCase()
        .replace("_", " ");
    }

    const updatedPlayer = await updatePlayer(id, playerData);

    if (!updatedPlayer) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json(updatedPlayer);
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(500).json({ error: "Failed to update player" });
  }
};

// DELETE /api/players/:id - Delete player
export const handleDeletePlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deletePlayer(id);

    if (!deleted) {
      return res.status(404).json({ error: "Player not found" });
    }

    res.json({ success: true, message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ error: "Failed to delete player" });
  }
};

// GET /api/players/team/:team - Get players by team
export const handleGetPlayersByTeam = async (req: Request, res: Response) => {
  try {
    const { team } = req.params;

    if (team !== "Team A" && team !== "Team B" && team !== "None") {
      return res.status(400).json({ error: "Invalid team name" });
    }

    const players = await getAllPlayers();
    const teamPlayers = players.filter((player) => player.team === team);
    res.json(teamPlayers);
  } catch (error) {
    console.error("Error fetching team players:", error);
    res.status(500).json({ error: "Failed to fetch team players" });
  }
};

// GET /api/players/position/:position - Get players by position
export const handleGetPlayersByPosition = async (
  req: Request,
  res: Response,
) => {
  try {
    const { position } = req.params;
    const validPositions = [
      "GOALKEEPERS",
      "DEFENDERS",
      "MIDFIELDERS",
      "FORWARDS",
      "COACHING STAFF",
    ];

    if (!validPositions.includes(position)) {
      return res.status(400).json({ error: "Invalid position" });
    }

    const players = await getAllPlayers();
    const positionPlayers = players.filter(
      (player) => player.position === position,
    );
    res.json(positionPlayers);
  } catch (error) {
    console.error("Error fetching position players:", error);
    res.status(500).json({ error: "Failed to fetch position players" });
  }
};
