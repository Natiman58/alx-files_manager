const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
        const url = `mongodb://${host}:${port}/${database}`;
        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.client.connect();
        this.db = null;
    }

    async isAlive() {
        try {
            await this.client.connect();
            await this.db().command({ ping: 1 });
            return true;
        } catch (err) {
            return false;
        }
    }

    async nbUsers() {
        try {
            await this.client.connect();
            const count = await this.client.db().collection('users').countDocuments();
            return count;
        } catch (err) {
            throw err;
        }
    }

    async nbFiles() {
        try {
            await this.client.connect();
            const count = await this.client.db().collection('files').countDocuments();
            return count;
        } catch (err) {
            throw err;
        }
    }
}

const dbClient = new DBClient();
module.exports = dbClient;