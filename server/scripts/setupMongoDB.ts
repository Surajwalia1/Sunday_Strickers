import { connectToDatabase, disconnectFromDatabase } from "../config/database";
import { migrateFromJSONToMongoDB } from "../services/playerService";
import fs from "fs/promises";
import path from "path";

async function setupMongoDB() {
  try {
    console.log("🚀 Setting up MongoDB for Sunday Game...");

    // Connect to MongoDB
    await connectToDatabase();
    console.log("✅ Connected to MongoDB");

    // Check if JSON data exists and migrate
    const jsonPath = path.join(process.cwd(), "server", "data", "players.json");

    try {
      await fs.access(jsonPath);
      console.log("📄 Found existing JSON data, migrating to MongoDB...");

      const jsonData = JSON.parse(await fs.readFile(jsonPath, "utf8"));
      await migrateFromJSONToMongoDB(jsonData);

      console.log(
        `✅ Successfully migrated ${jsonData.length} players to MongoDB`,
      );

      // Optionally backup the JSON file
      const backupPath = jsonPath.replace(".json", "_backup.json");
      await fs.copyFile(jsonPath, backupPath);
      console.log(`📋 Created backup at: ${backupPath}`);
    } catch (error) {
      console.log(
        "ℹ️  No existing JSON data found - starting with empty database",
      );
    }

    console.log("🎉 MongoDB setup complete!");
    console.log("🔗 Your data is now persistent and will never be lost!");
  } catch (error) {
    console.error("❌ Error setting up MongoDB:", error);
    process.exit(1);
  } finally {
    await disconnectFromDatabase();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupMongoDB();
}

export { setupMongoDB };
