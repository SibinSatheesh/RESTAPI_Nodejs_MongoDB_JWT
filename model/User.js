const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        min: 4,
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 255,
    },

   date: {
        type: Date,
        default: Date.now,
     
       
    },
});

module.exports = mongoose.model('User', userSchema);