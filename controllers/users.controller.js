const { verifyAccessToken } = require("../helpers/jwt");
const { User } = require("../models");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


class UserController {
    static async getUsers(req, res, next) {
        try {
            const user = await User.findAll({
                attributes: {
                    exclude: ["password"]
                }
            })
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        try {
            const userData = await User.findByPk(payload.id, {
                attributes: {
                    exclude: ["password"]
                }
            })
            res.status(200).json(userData);
        } catch (error) {
            next(error);

        }
    }
}


module.exports = UserController;