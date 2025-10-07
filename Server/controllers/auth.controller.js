require("dotenv").config();
const UserService = require("../services/auth.service");

const authController = {

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const token = await UserService.login(email, password);

            res.status(200).json({ 
            status: 'success', 
            token 
        });

        } catch (error) {
            const statusCode = error.code || 500;
            res.status(statusCode).json({
                status: 'error',
                message: error.message
            });
        }  
    },
    
    register: async (req, res) => {
        // 1. Extract data from the request
        const { email, password, name, role } = req.body;

        try {
            // 2. Call the core service function
            const newUser = await UserService.registerUser(email, password, name, role);
            
            res.status(201).json({ 
                message: 'User registered successfully',
                user: newUser
            });

        } catch (error) {
            const statusCode = error.code || 500;
            res.status(statusCode).json({ 
                error: true, 
                message: error.message 
            });
        }
    }



}
module.exports = authController;
