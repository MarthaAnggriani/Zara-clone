const { Product, Category, Customer, User, Favorite } = require("../models")
const { generateAccessToken } = require("../helpers/jwt");
const { Op } = require('sequelize');

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password, phoneNumber, address } = req.body;
            if (!email || !password) { throw ({ name: "ValidationError" }) }

            const customer = await Customer.create({
                email,
                password,
                phoneNumber,
                address
            });
            res.status(201).json({ id: customer.id, email: customer.email });
        } catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw ({ name: "ValidationError" })
            // mencari data berdasarkan email
            const customer = await Customer.findOne({ where: { email } });
            if (!customer) throw ({ name: "CustomerNotFound" })

            // check password
            const isValidated = customer.verifyPassword(password);
            if (!isValidated) throw ({ name: "InvalidInput" })

            const access_token = generateAccessToken(customer);
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
                    role: "customer"
                }, {
                    hooks: false
                })
            }
            const access_token = generateAccessToken(user);
            res.json({ access_token, user });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async getProducts(req, res, next) {
        try {
            const keyword = req.query.filterBy;
            const categoryId = req.query.categoryId;
            const page = req.query.page;

            const size = 8;
            let options = {
                where: { status: "active" },
                include: [
                    { model: User, attributes: { exclude: "password" } },
                    Category,
                ],
                order: [["id", "ASC"]],
            };
            if (page) {
                options.limit = size;
                options.offset = (page - 1) * size;
            }
            if (keyword) {
                options.where = {
                    ...options.where,
                    name: {
                        [Op.iLike]: `%${keyword}%`,
                    },
                };
            }
            if (categoryId) {
                options.where = {
                    ...options.where,
                    categoryId: categoryId,
                };
            }
            const products = await Product.findAll(options);

            delete options.limit;
            delete options.offset;

            const totalProducts = await Product.count(options);
            const totalPage = Math.ceil(totalProducts / size);

            res.status(200).json({ totalProducts, totalPage, currentPage: +page, products });
        }
        catch (error) {
            next(error);
        }
    }

    static async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Product.findByPk(id, {
                include: [
                    {
                        model: Category,
                        as: 'Category',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: User,
                        as: 'User',
                        attributes: ['id', 'email', 'role'],
                    },
                ]
            })
            console.log(id, data, "<<<<<");
            if (!data) throw { name: "NotFound" }
            res.status(200).json(data)
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async getCustomerFavorite(req, res, next) {
        try {
            const favorite = await Favorite.findAll({
                where: {
                    CustomerId: req.customer.id,
                },
                include: [
                    {
                        model: Customer,
                        attributes: { exclude: "password" },
                    },
                    Product,
                ],
            });
            res.status(200).json(favorite);
        } catch (error) {
            next(error);
        }
    }
    static async addCustomerFavorite(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                throw {
                    name: "NotFound",
                };
            }
            const addedFavorite = await Favorite.create({
                CustomerId: req.customer.id,
                ProductId: req.params.id,
            });
            res.status(200).json(addedFavorite);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;