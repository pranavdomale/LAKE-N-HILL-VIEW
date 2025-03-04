const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    room:
       [ {type:mongoose.Schema.Types.ObjectId,
        ref:'Room'}],
        
    
    hall:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hall',
        
    }],bike:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bike',
    }]
});

module.exports = mongoose.model('users ', userSchema);