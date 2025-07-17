import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/sunday-game";

console.log(
  "MongoDB URI configured:",
  MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@"),
); // Log URI without credentials

export const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 30000, // 30 second timeout for Atlas
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
        maxPoolSize: 10,
        minPoolSize: 5,
        maxIdleTimeMS: 30000,
        bufferCommands: false,
        bufferMaxEntries: 0,
      });
      console.log("✅ Connected to MongoDB successfully");
    }
    return mongoose.connection;
  } catch (error) {
    console.error(
      "❌ MongoDB connection failed:",
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});
