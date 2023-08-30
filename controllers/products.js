const { Product, Category, User, History } = require("../models");
const { login } = require("./auth.controller");

class Controller {
    static async createProducts(req, res, next) {
        const { name, description, price, stock, imgUrl, categoryId, authorId } = req.body;
        try {
            const data = await Product.create({ name, description, price, stock, imgUrl, categoryId, authorId })
            res.status(201).json(data)

            const message = `Product with id ${id} is created`;
            const history = await History.create({ title: name, description: message, updatedBy: email });
            res.status(200).json({ history, message: `Product with id ${id} is created` });
        }
        catch (error) {
            next(error)
        }
    }

    static async getProducts(req, res, next) {
        try {
            const data = await Product.findAll({
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
            if (!data) throw ({ name: "NotFound" })
            res.status(200).json(data)
        }
        catch (error) {
            next(error);
        }
    }

    static async getProductsById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Product.findOne({
                where: {
                    id
                },
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
            if (!data) throw { name: "NotFound" }
            res.status(200).json(data)
        }
        catch (error) { next(error); }
    }

    static async deleteProductsById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Product.findOne({
                where: { id },
                include: Category
            })
            if (!data) throw ({ name: "NotFound" });

            await Product.destroy({ where: { id } });

            res.status(200).json({ message: `${data.name} success to delete` });
        }
        catch (error) { next(error); }
    }

    static async getCategories(req, res, next) {
        try {
            const CategoryData = await Category.findAll()
            res.status(200).json(CategoryData);
            if (!CategoryData) throw ({ name: "NotFound" })
        }
        catch (error) {
            next(error);
        }
    }

    static async createCategories(req, res, next) {
        const { name } = req.body;
        try {
            const data = await Category.create({ name })
            res.status(201).json(data);
        }
        catch (error) {
            next(error)
        }
    }

    static async deleteCategoryById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Category.findOne({
                where: { id }
            })
            if (!data) throw ({ name: "NotFound" });

            await Category.destroy({ where: { id } });

            res.status(200).json({ message: `${data.name} success to delete` });
        }
        catch (error) {
            next(error);
        }
    }

    static async putProduct(req, res, next) {
        const { id } = req.params;
        const { name, decsription, price, stock, imgUrl, categoryId } = req.body;
        const { status } = req.body;
        const { email } = req.user;
        try {
            await Product.update({ name, decsription, price, stock, imgUrl, categoryId }, { where: { id } })

            const message = `Product with id ${id} is updated`;
            const history = await History.create({ title: name, description: message, updatedBy: email });
            res.status(200).json({ history, message: `Product with id ${id} is updated` });
        } catch (error) {
            next(error);
        }
    }

    static async putCategories(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            await Category.update({ name }, { where: { id } })

            res.status(200).json({ message: `Category with id ${id} updated` });

        } catch (error) {
            next(error);
        }
    }

    static async patchProduct(req, res, next) {
        const { id } = req.params;
        const { status } = req.body;
        const { email } = req.user;
        const oldData = await Product.findOne({ where: { id } })
        const oldStatus = oldData.status;
        try {
            await Product.update({ status }, { where: { id } });

            const updatedProduct = await Product.findOne({ where: { id } });

            if (oldStatus !== status) {
                const message = `Product with id ${id} has been updated from ${oldStatus} to ${updatedProduct.status}`;
                const history = await History.create({ title: oldData.name, description: message, updatedBy: email });
                res.status(200).json({ history });
            }
            else { res.status(200).json({ message: `There is no change in status product` }); }
        } catch (error) {
            next(error);
        }
    }

    static async getHistories(req, res, next) {
        try {
            const data = await History.findAll({ order: [["createdAt", "DESC"]] })
            if (!data) throw ({ name: "NotFound" });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}


module.exports = Controller;