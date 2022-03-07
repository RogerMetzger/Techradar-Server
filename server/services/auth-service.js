const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { UserService } = require('./user-service');
const userService = new UserService();

class AuthenticationService {

    async login(email, password) {
        let token = null;

        if (email && password) {

            let user = await userService.getByEmail(email);

            if (user) {
                let hashedPassword = md5(password.toString());
                if (user.password == hashedPassword && user.email == email) {

                    token = jwt.sign(
                        {email: user.email, role: user.role},
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' }
                    );
                }
            }
        }
        return token;
    }

    async register(email, password) {
        let token = null;

        if (email && password) {

            let user = await userService.getByEmail(email);

            if (!user) {
                let hashedPassword = md5(password.toString());
                let result = await userService.addUser(email, hashedPassword, 'User');
                if (result) {

                    token = jwt.sign(
                        {email: email, role: 'User'},
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' }
                    );
                }
            }
        }
        return token;
    }
}

exports.AuthenticationService = AuthenticationService;