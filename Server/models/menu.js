const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    isAvailable: {
        type: Boolean,
        required: true,
    },
    managerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Item',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})


const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;