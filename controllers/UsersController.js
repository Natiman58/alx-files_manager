const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const userEmail = await dbClient.db.collection('users').findOne({ email });
    if (userEmail) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedpwd = sha1(password);
    const result = await dbClient.db.collection('users').insertOne({ email, password: hashedpwd });

    const user = { _id: result.insertedId, email };
    return res.status(201).json(user);
  }
}

module.exports = UsersController;
