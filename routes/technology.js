const express = require('express');
const techradarRouter = express.Router();
const objectId = require("mongodb").ObjectId;

const dbo = require('../database/connection');


techradarRouter.post("/technology", async (req, res) => {
    const technologyDocument = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        ring: req.body.category,
        classification: req.body.classification,
        isPublic: false,
        published_at: null,
        created_by: req.body.created_by,
        created_at: new Date(),
        updated_by: req.body.created_by,
        updated_at: new Date()
    };

    const dbConnect = dbo.getDb();
    const collection = dbConnect.collection('Technologies');
    const result = await collection.insertOne(technologyDocument);

    console.log(result);
    console.log('Technology created');
    res.status(201);
    res.end();
});

techradarRouter.get('/technologies', async (req, res) => {
    const dbConnect = dbo.getDb();

    const collection = dbConnect.collection('Technologies');
    const result = await collection.find({}).toArray();

    console.log('Get all technologies called');
    res.send(result);
    res.end();
});

techradarRouter.get('/technology/:id', async (req, res) => {
    const dbConnect = dbo.getDb();

    const query = {_id: objectId(req.params.id)};

    const collection = dbConnect.collection('Technologies');
    const result = await collection.findOne(query);
    
    if (result) {
        console.log('Get technology successful');
        res.send(result);
    } else {
        console.log('Get technology failed');
        res.status(404);
    }
    res.end();
});

techradarRouter.delete('/technology/:id', async (req, res) => {
    const dbConnect = dbo.getDb();

    const query = {_id: objectId(req.params.id)};

    const collection = dbConnect.collection('Technologies');
    const result = await collection.deleteOne(query);

    if (result) {
        console.log('Technology deleted');
        res.send(result);
    } else {
        console.log('Delete technology failed');
        res.status(404);
    }
    res.end();
});

techradarRouter.put('/technology/:id', async (req, res) => {
    const dbConnect = dbo.getDb();

    const query = {_id: objectId(req.params.id)};
    const updates = {
        $set: {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            updated_by: req.body.updated_by,
            updated_at: new Date()
        }
    };

    const collection = dbConnect.collection('Technologies');
    const result = await collection.updateOne(query, updates);

    if (result) {
        console.log('Technology updated');
        res.send(result);
    } else {
        console.log('Update technology failed');
        res.status(404);
    }
    res.end();
});

techradarRouter.put('/technology/publish/:id', async (req, res) => {
    const dbConnect = dbo.getDb();

    const query = {_id: objectId(req.params.id)};
    const updates = {
        $set: {
            ring: req.body.ring,
            classification: req.body.classification,
            isPublic: true,
            published_at: new Date(),
            updated_by: req.body.updated_by,
            updated_at: new Date()
        }
    };

    const collection = dbConnect.collection('Technologies');
    const result = await collection.updateOne(query, updates);

    if (result) {
        console.log('Technology published');
        res.send(result);
    } else {
        console.log('Publish technology failed');
        res.status(404);
    }
    res.end();
});

techradarRouter.put('/technology/classify/:id', async (req, res) => {
    const dbConnect = dbo.getDb();

    const query = {_id: objectId(req.params.id)};
    const updates = {
        $set: {
            ring: req.body.ring,
            classification: req.body.classification,
            updated_by: req.body.updated_by,
            updated_at: new Date()
        }
    };

    const collection = dbConnect.collection('Technologies');
    const result = await collection.updateOne(query, updates);

    if (result) {
        console.log('Technology classified');
        res.send(result);
    } else {
        console.log('Classify technology failed');
        res.status(404);
    }
    res.end();
});

module.exports = techradarRouter;