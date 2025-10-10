const UserModel = require('../models/user');

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const customerService = {

     /**
     * Delete user account
     * @param {ID} id - The user's ID.
     * @returns {string} The deleted user's details
     * @throws {Error} If user not found
     */
    async deleteAccount(id) {

        const deletedUser = await UserModel.findByIdAndDelete(id)

        if(!deletedUser){
            const error = new Error('User not found');
            error.code = 404;
            throw error;
        }

        return{
            id: deletedUser._id,
            name: deletedUser.name,
            email: deletedUser.email,
            message: 'User deleted successfully'
        }
    },
     /**
     * Get user account
     * @param {ID} id - The user's ID.
     * @returns {string} The user's details
     * @throws {Error} If user not found or ID not provided
     */
    async getCurrentUser(id) {

        if (!id) {
            const error = new Error('No ID provided');
            error.code = 400;
            throw error;
        }
        const user = await UserModel.findById(id);

        if (!user) {
            const error = new Error('User not found');
            error.code = 404;
            throw error;
        }
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }

};

module.exports = customerService;