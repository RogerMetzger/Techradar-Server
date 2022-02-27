require('dotenv').config({ path: './config.env' });

const express = require('express');
const bodyParser = require('body-parser');
const dbo = require('./database/connection');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const PORT = process.env.PORT || 8000;
const server = express();

server.use(bodyParser.json());
server.use(require('./routes/technology'));
server.use('/healthcheck', require('express-healthcheck')());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const logErrors = (err, req, res, next) => {
    console.error(err.stack);
    next(err);
};

const clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
};

const errorHandler = (err, req, res, next) => {
    res.status(500);
    res.render('error', { error: err });
};

server.use(logErrors);
server.use(clientErrorHandler);
server.use(errorHandler);


dbo.connectToServer(function (err) {
    if (err) {
        console.error(err);
        process.exit();
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});