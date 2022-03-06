const objectId = require("mongodb").ObjectId;
const dbo = require('../database/connection');

class TechnologyService {

    async create(tech, user) {
        const document = {
            name: tech.name,
            description: tech.description,
            category: tech.category,
            ring: tech.ring,
            classification: tech.classification,
            isPublic: false,
            published_at: null,
            created_by: this.getUserDocument(user),
            created_at: new Date(),
            updated_by: this.getUserDocument(user),
            updated_at: new Date()
        };

        return await this.getCollection().insertOne(document);
    }

    async getAll() {
        return await this.getCollection().find({}).toArray();
    }

    async getById(id) {
        const query = {_id: objectId(id)};
        return await this.getCollection().findOne(query);
    }

    async delete(id) {
        const query = {_id: objectId(id)};
        return await this.getCollection().deleteOne(query);
    }

    async update(id, tech, user) {
        const query = {_id: objectId(id)};
        const updates = {
            $set: {
                name: tech.name,
                description: tech.description,
                category: tech.category,
                updated_by: this.getUserDocument(user),
                updated_at: new Date()
            }
        };
        return await this.getCollection().updateOne(query, updates);
    }

    async publish(id, tech, user) {
        const query = {_id: objectId(id)};
        const updates = {
            $set: {
                ring: tech.ring,
                classification: tech.classification,
                isPublic: true,
                published_at: new Date(),
                updated_by: this.getUserDocument(user),
                updated_at: new Date()
            }
        };
        return await this.getCollection().updateOne(query, updates);
    }

    async classify(id, tech, user) {
        const query = {_id: objectId(id)};
        const updates = {
            $set: {
                ring: tech.ring,
                classification: tech.classification,
                updated_by: this.getUserDocument(user),
                updated_at: new Date()
            }
        };
        return await this.getCollection().updateOne(query, updates);
    }

    getUserDocument(user) {
        return {
            _id: user._id,
            email: user.email,
            role: user.role
        };
    }

    getCollection() {
        const db = dbo.getDb();
        return db.collection('Technologies');
    }
}

exports.TechnologyService = TechnologyService;