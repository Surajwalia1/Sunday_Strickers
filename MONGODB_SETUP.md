# MongoDB Setup for Sunday Game

Your football player data will now be stored in MongoDB, ensuring it's persistent and never gets lost!

## Option 1: Docker MongoDB (Recommended for Local Development)

### 1. Install Docker

- Download Docker from: https://www.docker.com/products/docker-desktop

### 2. Start MongoDB with Docker

```bash
# Start MongoDB container
docker-compose up -d

# Check if it's running
docker ps
```

### 3. Migrate Your Existing Data

```bash
# Build the project
npm run build

# Start the dev server
npm run dev

# In another terminal, migrate your data
npm run migrate-data
```

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

### 1. Create MongoDB Atlas Account

- Go to: https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a new cluster

### 2. Get Connection String

- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string

### 3. Update .env File

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sunday-game
```

### 4. Migrate Your Data

```bash
npm run dev
npm run migrate-data
```

## Option 3: Local MongoDB Installation

### 1. Install MongoDB Community Server

- Download from: https://www.mongodb.com/try/download/community

### 2. Start MongoDB Service

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

### 3. Use Simple Connection String

```env
MONGODB_URI=mongodb://localhost:27017/sunday-game
```

## Verification

After setup, you can verify your MongoDB connection:

1. **Check Server Logs**: Look for "✅ Connected to MongoDB successfully"
2. **Test Migration**: Visit `http://localhost:3000/api/migrate-to-mongodb` (POST request)
3. **View Players**: Visit `http://localhost:3000/api/players`

## Benefits of MongoDB

✅ **Persistent Data**: Your player data will never be lost
✅ **Backup & Recovery**: Automatic backups with MongoDB Atlas
✅ **Scalability**: Handle thousands of players
✅ **Real-time**: Fast queries and updates
✅ **Professional**: Industry-standard database

## Backup Your Current Data

Your existing JSON data will be automatically backed up during migration to:
`server/data/players_backup.json`

## Troubleshooting

### Connection Issues

- Ensure MongoDB is running
- Check your connection string in `.env`
- Verify network connectivity

### Migration Issues

- Ensure the JSON file exists in `server/data/players.json`
- Check server logs for detailed errors

### Docker Issues

```bash
# Stop and remove containers
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Check logs
docker-compose logs mongodb
```

## Next Steps

Once MongoDB is set up and your data is migrated:

1. Your player data is now persistent ✅
2. You can add/edit/delete players safely ✅
3. Data survives server restarts ✅
4. You can easily backup and restore ✅

Enjoy your secure and persistent Sunday Game database! 🏆⚽
