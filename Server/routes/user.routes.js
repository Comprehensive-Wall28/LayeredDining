const { Router } = require("express");
const router = Router();

const authenticationMiddleware = require('../middleware/authentication.middleware.js');
const authorizationMiddleware = require('../middleware/authorization.middleware.js');
const authController = require("../controllers/auth.controller.js");
const userController = require("../controllers/user.controller.js");

const ROLES = {
    ADMIN: 'Admin',
    MANAGER: 'Manager',
    CUSTOMER: 'Customer'
};

//user routes
router.get("/",authenticationMiddleware,userController.getCurrentUser);
router.put("/profile", authenticationMiddleware, userController.updateUserProfile)

router.delete("/delete/:id",authenticationMiddleware,userController.deleteAccount);

module.exports = router;
