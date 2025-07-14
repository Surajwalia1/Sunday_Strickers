import express from "express";
import cors from "cors";
import path from "path";
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

export function createServer() {
  const app = express();

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

  // Error handling middleware for uploads
  app.use(handleUploadError);

  return app;
}
