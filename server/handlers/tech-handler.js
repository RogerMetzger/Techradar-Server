const { TechnologyService } = require("../services/tech-service");

const service = new TechnologyService();

class TechnologyHandler {

    async create(req, res) {
        let result = await service.create(req.body);

        if (result) {
            console.log('Create technology successful');
            res.status(201);
        } else {
            console.log('Create technology failed');
            res.status(404);
        }
        res.end();
    }

    async getAll(req, res) {
        let result = await service.getAll();

        if (result) {
            console.log('Get all technologies successful');
            res.send(result);
        } else {
            console.log('Get all technologies failed');
            res.status(404);
        }
        res.end();
    }

    async getById(req, res) {
        let result = await service.getById(req.params.id);

        if (result) {
            console.log('Get technology successful');
            res.send(result);
        } else {
            console.log('Get technology failed');
            res.status(404);
        }
        res.end();
    }

    async delete(req, res) {
        let result = await service.delete(req.params.id);
        
        if (result) {
            console.log('Technology deleted');
            res.send(result);
        } else {
            console.log('Delete technology failed');
            res.status(404);
        }
        res.end();
    }

    async update(req, res) {
        let result = await service.update(req.params.id, req.body);

        if (result) {
            console.log('Technology updated');
            res.send(result);
        } else {
            console.log('Update technology failed');
            res.status(404);
        }
        res.end();
    }

    async publish(req, res) {
        let result = await service.publish(req.params.id, req.body);

        if (result) {
            console.log('Technology published');
            res.send(result);
        } else {
            console.log('Publish technology failed');
            res.status(404);
        }
        res.end();
    }

    async classify(req, res) {
        let result = await service.classify(req.params.id, req.body);

        if (result) {
            console.log('Technology classified');
            res.send(result);
        } else {
            console.log('Classify technology failed');
            res.status(404);
        }
        res.end();
    }
}

exports.TechnologyHandler = TechnologyHandler;