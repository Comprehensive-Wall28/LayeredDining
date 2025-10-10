const UserModel = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const customerService = {

     /**
     * Delete user account
     * @param {ID} id - The user's email address.
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
    }

};

module.exports = customerService;