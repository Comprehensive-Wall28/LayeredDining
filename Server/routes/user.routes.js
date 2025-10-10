const { Router } = require("express");
const router = Router();

const authenticationMiddleware = require('../middleware/authentication.middleware.js');
const authorizationMiddleware = require('../middleware/authorization.middleware.js');
const authController = require("../controllers/auth.controller.js");
const customerController = require("../controllers/customer.controller.js");

const ROLES = {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    CUSTOMER: 'Customer'
};

//user routes
router.delete("/delete/:id",authenticationMiddleware,customerController.deleteAccount);

module.exports = router;
