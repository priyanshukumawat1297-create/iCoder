const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique:true
    },
    password:{
        type:String,
        required : true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',UserSchema) // Lekin Schema khud database ke saath kaam nahi karta."Mongoose, mere UserSchema ke according ek User Model bana de."Ye Model baad mein database mein user ko create/find/update/delete karne ke kaam aayega.
// short mai = UserSchema se User Model banao aur us Model ko doosri files mein use karne ke liye export kar do."