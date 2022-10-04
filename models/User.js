const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    // username: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    email: {type: String, lowercase: true, default: ''
    },
    phone: {type: String, default: ''},
    sex: {type: String, lowercase: true, enum: ['male', 'female', 'other']},
    verifyEmailHash: String,
    isEmailVerified: Boolean,
    role: {type: String, default: 'user'},
    hashedPassword: String,
    salt: String,
    provider: String,
    google: {},
    createdAt: {type: Date, default: Date.now}

});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);