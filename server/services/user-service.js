let jwt = require('jsonwebtoken');
const dbo = require('../database/connection');

class UserService {

    async getAll() {
        const dbConnect = dbo.getDb();
        const collection = dbConnect.collection('Users');
        const result = await collection.find({}).toArray();
        return result;
    }

    async getByEmail(email) {
        const dbConnect = dbo.getDb();
        const collection = dbConnect.collection('Users');
        
        const query = {email: email};
        const result = await collection.findOne(query);
        return result;
    }

    async addUser(email, password, role) {

        const userDocument = {
            email: email,
            password: password,
            role: role,
            created_at: new Date()
        };

        const dbConnect = dbo.getDb();
        const collection = dbConnect.collection('Users');
        const result = await collection.insertOne(userDocument);
        return result;
    }

    async getUserFromToken(token) {
        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            let email = jwt.decode(token).email;
            return await this.getByEmail(email);
        } else {
            return null;
        }
    }
}

exports.UserService = UserService;