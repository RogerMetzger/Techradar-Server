const { AuthenticationService } = require('../services/auth-service');

const service = new AuthenticationService();

class AuthenticationHandler {

    async login(req, res) {

        console.log(req.body);

        let email = req.body.email;
        let password = req.body.password;

        if (email && password) {
            
            let token = await service.login(email, password);

            if(token) {
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.status(403);
                res.json({
                    success: false,
                    message: 'Incorrect email or password'
                });
            }
        } else {
            res.status(400);
            res.json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }

    async register(req, res) {

        console.log(req.body);

        let email = req.body.email;
        let password = req.body.password;

        if (email && password) {
            let token = await service.register(email, password);

            if (token) {
                res.json({
                    success: true,
                    message: 'Registration successful!',
                    token: token
                });
            } else {
                res.status(403);
                res.json({
                    success: false,
                    message: 'User with that email already exists'
                });
            }
        } else {
            res.status(400);
            res.json({
                success: false,
                message: 'Registration failed! Please check the request'
            });
        }
    }

    index (req, res) {
        res.json({
            success: true,
            message: 'Index page'
        })
    }
}

exports.AuthenticationHandler = AuthenticationHandler;