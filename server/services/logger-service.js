const dbo = require('../database/connection');

class LoggerService {

    async logAdministrationAccess(date, email, url, method, data) {
        const document = {
            date: date,
            email: email,
            url: url,
            method: method,
            data: data
        };

        return await this.getCollection().insertOne(document);
    }

    getCollection() {
        const db = dbo.getDb();
        return db.collection('Accesslog');
    }
}

exports.LoggerService = LoggerService;