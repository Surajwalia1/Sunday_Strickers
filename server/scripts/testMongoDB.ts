import { connectToDatabase, disconnectFromDatabase } from "../config/database";
import { Player } from "../models/Player";

async function testMongoDBOperations() {
  try {
    console.log("🧪 Testing MongoDB CRUD operations...");

    // Connect to MongoDB
    await connectToDatabase();

    // Test 1: Count existing players
    const count = await Player.countDocuments();
    console.log(`✅ Found ${count} players in database`);

    // Test 2: Create a test player
    const testPlayer = new Player({
      name: "Test Player",
      firstName: "Test",
      lastName: "PLAYER",
      nickname: "Tester",
      position: "MIDFIELDERS",
      positionDisplay: "midfielders",
      team: "Team A",
      jerseyNumber: "99",
      photo: "https://via.placeholder.com/400x500",
      bio: "This is a test player for MongoDB verification",
      appearances: 1,
      goals: 0,
      funFact: "Created for testing MongoDB connection",
      quote: "Test successful!",
    });

    const savedPlayer = await testPlayer.save();
    console.log(`✅ CREATE: Test player created with ID: ${savedPlayer._id}`);

    // Test 3: Read the player
    const foundPlayer = await Player.findById(savedPlayer._id);
    console.log(
      `✅ READ: Found player: ${foundPlayer?.firstName} ${foundPlayer?.lastName}`,
    );

    // Test 4: Update the player
    const updatedPlayer = await Player.findByIdAndUpdate(
      savedPlayer._id,
      { appearances: 2, goals: 1 },
      { new: true },
    );
    console.log(
      `✅ UPDATE: Updated appearances to ${updatedPlayer?.appearances}, goals to ${updatedPlayer?.goals}`,
    );

    // Test 5: Delete the test player
    await Player.findByIdAndDelete(savedPlayer._id);
    console.log(`✅ DELETE: Test player removed`);

    // Test 6: Verify final count
    const finalCount = await Player.countDocuments();
    console.log(`✅ Final count: ${finalCount} players (back to original)`);

    console.log("🎉 All MongoDB operations working perfectly!");
  } catch (error) {
    console.error("❌ MongoDB test failed:", error);
  } finally {
    await disconnectFromDatabase();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testMongoDBOperations();
}

export { testMongoDBOperations };
