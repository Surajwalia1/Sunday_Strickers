import { connectToDatabase, disconnectFromDatabase } from "../config/database";
import { Player } from "../models/Player";

async function migrateTeamNames() {
  try {
    console.log("🔄 Starting team name migration...");

    // Connect to MongoDB
    await connectToDatabase();

    // Update Team A to Tharki Tigers
    const teamAResult = await Player.updateMany(
      { team: "Team A" },
      { team: "Tharki Tigers" },
    );
    console.log(
      `✅ Updated ${teamAResult.modifiedCount} players from "Team A" to "Tharki Tigers"`,
    );

    // Update Team B to Nange Shikari
    const teamBResult = await Player.updateMany(
      { team: "Team B" },
      { team: "Nange Shikari" },
    );
    console.log(
      `✅ Updated ${teamBResult.modifiedCount} players from "Team B" to "Nange Shikari"`,
    );

    // Verify the changes
    const tharkiTigers = await Player.countDocuments({ team: "Tharki Tigers" });
    const nangeShikari = await Player.countDocuments({ team: "Nange Shikari" });
    const none = await Player.countDocuments({ team: "None" });

    console.log("📊 Final team distribution:");
    console.log(`  - Tharki Tigers: ${tharkiTigers} players`);
    console.log(`  - Nange Shikari: ${nangeShikari} players`);
    console.log(`  - None: ${none} players`);

    console.log("🎉 Team name migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await disconnectFromDatabase();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateTeamNames();
}

export { migrateTeamNames };
