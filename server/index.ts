import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import { handleDemo } from "./routes/demo";
import { handlePhotoUpload, handleUploadError } from "./routes/upload";
import {
  handleGetAllPlayers,
  handleGetPlayerById,
  handleAddPlayer,
  handleUpdatePlayer,
  handleDeletePlayer,
  handleGetPlayersByTeam,
  handleGetPlayersByPosition,
} from "./routes/players";
import { connectToDatabase } from "./config/database";
import { migrateFromJSONToMongoDB } from "./services/playerService";

export function createServer() {
  const app = express();

  // Initialize MongoDB connection
  connectToDatabase().catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from uploads directory
  app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "public", "uploads")),
  );

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Photo upload route
  app.post("/api/upload/photo", handlePhotoUpload);

  // Player CRUD routes
  app.get("/api/players", handleGetAllPlayers);
  app.get("/api/players/team/:team", handleGetPlayersByTeam);
  app.get("/api/players/position/:position", handleGetPlayersByPosition);
  app.get("/api/players/:id", handleGetPlayerById);
  app.post("/api/players", handleAddPlayer);
  app.put("/api/players/:id", handleUpdatePlayer);
  app.delete("/api/players/:id", handleDeletePlayer);

  // Migration route to transfer JSON data to MongoDB
  app.post("/api/migrate-to-mongodb", async (req, res) => {
    try {
      const jsonPath = path.join(
        process.cwd(),
        "server",
        "data",
        "players.json",
      );

      // Check if JSON file exists
      try {
        await fs.access(jsonPath);
      } catch {
        return res
          .status(404)
          .json({ error: "No JSON data file found to migrate" });
      }

      // Read existing JSON data
      const jsonData = JSON.parse(await fs.readFile(jsonPath, "utf8"));

      // Migrate to MongoDB
      await migrateFromJSONToMongoDB(jsonData);

      res.json({
        success: true,
        message: `Successfully migrated ${jsonData.length} players to MongoDB`,
        count: jsonData.length,
      });
    } catch (error) {
      console.error("Migration error:", error);
      res.status(500).json({
        error: "Failed to migrate data to MongoDB",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Error handling middleware for uploads
  app.use(handleUploadError);

  return app;
}
