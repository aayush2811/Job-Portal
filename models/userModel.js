const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstname:{
        type:String,

    },
    email:{
        type:String,
        trim:true,
        unique: true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:'Job Seeker'
    },
    isPayment: {
        type: Boolean,
        default: false
    },
    token:{
        type:String
    }
})

module.exports = mongoose.model('User', userSchema);