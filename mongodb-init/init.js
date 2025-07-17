// MongoDB initialization script for Sunday Game database

// Switch to the sunday-game database
db = db.getSiblingDB("sunday-game");

// Create a user for the application
db.createUser({
  user: "sunday_user",
  pwd: "sunday_password",
  roles: [
    {
      role: "readWrite",
      db: "sunday-game",
    },
  ],
});

// Create indexes for better performance
db.players.createIndex({ team: 1 });
db.players.createIndex({ position: 1 });
db.players.createIndex({ firstName: 1, lastName: 1 });

print("Sunday Game database initialized successfully!");
