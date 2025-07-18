import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Ensure MONGODB_URI is always provided via environment variable
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is required");
}

console.log(
  "MongoDB URI configured:",
  MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, "//***:***@"),
); // Log URI without credentials

export const connectToDatabase = async () => {
  try {
    // Only connect if not already connected
    if (mongoose.connection.readyState === 0) {
      console.log("Connecting to MongoDB...");
      
      // Add retries for serverless environment
      let retries = 3;
      while (retries > 0) {
        try {
          await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000, // Reduced timeout for serverless
            socketTimeoutMS: 15000,
            connectTimeoutMS: 10000,
            maxPoolSize: 5, // Reduced pool size for serverless
            minPoolSize: 1,
            maxIdleTimeMS: 10000,
            bufferCommands: false,
          });
          console.log("✅ Connected to MongoDB successfully");
          break;
        } catch (err) {
          retries--;
          if (retries === 0) throw err;
          console.log(`Connection attempt failed. Retries left: ${retries}`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between retries
        }
      }
    }
    return mongoose.connection;
  } catch (error) {
    console.error(
      "❌ MongoDB connection failed:",
      error instanceof Error ? error.message : error,
    );
    throw new Error("Failed to connect to database. Please try again later.");
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
