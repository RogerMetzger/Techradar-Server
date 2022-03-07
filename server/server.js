require('dotenv').config({ path: './config.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbo = require('./database/connection');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const middleware = require('./middleware');
const { AuthenticationHandler } = require('./handlers/auth-handler');
const { TechnologyHandler } = require('./handlers/tech-handler');

function main () {

    const PORT = process.env.PORT || 8000;
    let server = express();
    let authHandler = new AuthenticationHandler();
    let techHandler = new TechnologyHandler();

    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());
    server.use(cors({origin: true, credentials: true}));
    
    // User
    server.post('/user/login', authHandler.login);
    server.post('/user/register', authHandler.register);

    // Technology
    server.post('/technology', middleware.checkToken, middleware.canCreate, middleware.logger, techHandler.create);
    server.get('/technologies', middleware.checkToken, techHandler.getAll);
    server.get('/technology/:id', middleware.checkToken, middleware.canRead, middleware.logger, techHandler.getById);
    server.delete('/technology/:id', middleware.checkToken, middleware.canDelete, middleware.logger, techHandler.delete);
    server.put('/technology/:id', middleware.checkToken, middleware.canUpdate, middleware.logger, techHandler.update);
    server.put('/technology/publish/:id', middleware.checkToken, middleware.canPublish, middleware.logger, techHandler.publish);
    server.put('/technology/classify/:id', middleware.checkToken, middleware.canUpdate, middleware.logger, techHandler.classify);

    // Other
    server.use('/healthcheck', require('express-healthcheck')());
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    //error handling
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

    // Database connect
    dbo.connectToServer(function (err) {
        if (err) {
            console.error(err);
            process.exit();
        }
    })

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}

main();