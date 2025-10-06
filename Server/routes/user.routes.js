const { Router } = require("express");
const router = Router();

const authenticationMiddleware = require('../middleware/authentication.middleware.js');
const authorizationMiddleware = require('../middleware/authorization.middleware.js');
const authController = require("../controllers/auth.controller.js");

const ROLES = {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    CUSTOMER: 'Customer'
};

//router.use(authorizationMiddleware)

router.post("/login",authController.login );
router.post("/register", authController.register );

module.exports = router;
