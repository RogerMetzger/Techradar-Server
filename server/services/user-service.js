
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
}

exports.UserService = UserService;