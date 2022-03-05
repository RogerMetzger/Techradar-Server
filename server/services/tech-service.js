const objectId = require("mongodb").ObjectId;
const dbo = require('../database/connection');

class TechnologyService {

    async create(tech) {
        const document = {
            name: tech.name,
            description: tech.description,
            category: tech.category,
            ring: tech.ring,
            classification: tech.classification,
            isPublic: false,
            published_at: null,
            created_by: tech.created_by,
            created_at: new Date(),
            updated_by: tech.created_by,
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

    async update(id, tech) {
        const query = {_id: objectId(id)};
        const updates = {
            $set: {
                name: tech.name,
                description: tech.description,
                category: tech.category,
                updated_by: tech.updated_by,
                updated_at: new Date()
            }
        };
        return await this.getCollection().updateOne(query, updates);
    }

    async publish(id, tech) {
        const query = {_id: objectId(id)};
        const updates = {
            $set: {
                ring: tech.ring,
                classification: tech.classification,
                isPublic: true,
                published_at: new Date(),
                updated_by: tech.updated_by,
                updated_at: new Date()
            }
        };
        return await this.getCollection().updateOne(query, updates);
    }

    async classify(id, tech) {
        const query = {_id: objectId(id)};
        const updates = {
            $set: {
                ring: tech.ring,
                classification: tech.classification,
                updated_by: tech.updated_by,
                updated_at: new Date()
            }
        };
        return await this.getCollection().updateOne(query, updates);
    }

    getCollection() {
        const db = dbo.getDb();
        return db.collection('Technologies');
    }
}

exports.TechnologyService = TechnologyService;