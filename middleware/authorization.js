const { Product } = require("../models");

module.exports = async (req, res, next) => {
    // Admin bisa menghapus movie milik siapa saja
    // user bisa menghapus movie milik diri sendiri

    try {
        const data = await Product.findByPk(req.params.id);
        if (!data) throw ({ name: "NotFound" });
        if (req.user.role === "admin") {
            next();
        }
        else if (data.authorId === req.user.id) {
            next();
        }
        else {
            throw ({ name: "Forbidden" })
        }
    } catch (error) {
        next(error);
    }
};