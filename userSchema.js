const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name: String,
    Id: Number,
    name: String,
    address: String,
    dob: String,
    state: String,
})

const User = new mongoose.model('User', userSchema)


module.exports = User;