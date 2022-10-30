const ADDRESS = require('./schemas/address.js');
const VETHEAD = require('./schemas/vetHeadOfMedics.js');
const MONGOOSE = require('mongoose');
var Schema = MONGOOSE.Schema;

var VeterinarySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    valid: { type: Boolean, required: true },
    phone: { type: Number, required: true },
    Education: { type: String, required: false,default: null },
    Specialization: { type: String, required: false,default: null },
    Experience: { type: String, required: false,default: null },
    Break_Hours: { type: [MONGOOSE.ObjectId], required: false },
    vetAddress: {
        street: { type: String, required: false },
        number: { type: Number, required: false },
        intNumber: { type: Number, required: false },
        postalCode: { type: Number, required: false }

    },
    vetHeadOfMedics: {
        name: { type: String, required: false },
        code: { type: Number, required: false }, }

});

module.exports = MONGOOSE.model('veterinary', VeterinarySchema);
