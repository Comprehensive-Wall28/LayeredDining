require("dotenv").config();
const customerService = require("../services/customer.service");

const customerController = {

    deleteAccount: async (req, res) => {
        try {
            const { id } = req.params;

            if(!id){
                const error = new Error('No ID provided')
                error.code = 400;
                throw error;
            }

            await customerService.deleteAccount(id);

             res.status(200).json({
                status: 'success',
                message: 'User account deleted successfully'
            });

        } catch (error) {
            const statusCode = error.code || 500;
            res.status(statusCode).json({
                status: 'error',
                message: error.message
            });
        }
    }

}
module.exports = customerController;
