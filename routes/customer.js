const express = require('express')
const router = express.Router()
const CustController = require("../controllers/customer");
const customerAuthentication = require("../middleware/custAuthentication")


// customer
router.post('/customer/register', CustController.register);
router.post('/customer/login', CustController.login);
router.post('/customer/google-login', CustController.googleLogin);

router.get('/customer/products', CustController.getProducts);
router.get('/customer/products/:id', CustController.getProductById);
// customer authentication
router.get('/customer/favorites', customerAuthentication, CustController.getCustomerFavorite);
router.post('/customer/favorites/:id', customerAuthentication, CustController.addCustomerFavorite);

module.exports = router;
