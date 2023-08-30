const { OAuth2Client } = require('google-auth-library');
const { generateAccessToken } = require("../helpers/jwt");
const { User } = require("../models");

class AuthController {
    static async register(req, res, next) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body;
            const user = await User.create({ username, email, password, role, phoneNumber, address });
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw ({ name: "ValidationError" })
            // mencari data berdasarkan email
            const user = await User.findOne({ where: { email } });
            if (!user) throw ({ name: "UserNotFound" })

            // check password
            let isValidated = user.verifyPassword(password);
            if (!isValidated) throw ({ name: "InvalidInput" })

            const access_token = generateAccessToken(user);
            res.status(200).json({ access_token: access_token });

        }
        catch (error) {
            next(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const token = req.headers.google_token;
            const { OAuth2Client } = require('google-auth-library');
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            const user = await User.findOne({ where: { email: payload.email } })
            if (!user) {
                user = await User.create({
                    email: payload.email,
                    password: Math.random().toString(),
                    role: "user"
                }, {
                    hooks: false
                })
            }
            const access_token = generateAccessToken(user);
            res.json({ access_token, user });

        } catch (error) {
            next(error);
        }

    }
}

module.exports = AuthController;