const express = require('express')
const router = express.Router()
const Controller = require("../controllers/products");
const AuthController = require("../controllers/auth.controller")
const UserController = require("../controllers/users.controller")
const authz = require("../middleware/authorization");
const auth = require("../middleware/authentication");

// GET /
// http://localhost:3000
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/google-login', AuthController.googleLogin);

// authentication
router.use(auth);
router.get('/products', Controller.getProducts);
router.post('/products', Controller.createProducts);
router.get('/products/:id', Controller.getProductsById);
router.put('/products/:id', Controller.putProduct);
router.delete('/products/:id', authz, Controller.deleteProductsById);
router.patch('/products/:id', authz, Controller.patchProduct);

router.get('/categories', Controller.getCategories);
router.post('/categories', Controller.createCategories);
router.delete('/categories/:id', Controller.deleteCategoryById);
router.put('/categories/:id', Controller.putCategories);

router.get('/histories', Controller.getHistories);

// users
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);


module.exports = router;