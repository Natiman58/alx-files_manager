const Redis = require('../utils/redis');
const Database = require('../utils/db');

async function getStatus(req, res) {
  const redisStatus = await Redis.isAlive();
  const dbStatus = await Database.isAlive();
  res.status(200).json({ redis: redisStatus, db: dbStatus });
}

async function getStats(req, res) {
  const userCount = await Database.nbUsers();
  const filesCount = await Database.nbFiles();
  res.status(200).json({ users: userCount, files: filesCount });
}

module.exports = {
  getStats,
  getStatus,
};
