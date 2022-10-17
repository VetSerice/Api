const MONGOOSE = require('mongoose');
const ADDRESS = require('./schemas/address.js');

var Schema = MONGOOSE.Schema;

var ClientSchema = new Schema({
	nameClient: { type: String, required: false },
	email: { type: String, required: false },
	password: { type: String, required: false },
	phone: { type: Number, required: true },
	valid: { type: Boolean, required: true },
	pets: { type: [MONGOOSE.ObjectId], required: true },
	address: {
		street: { type: String, required: false },
		number: { type: Number, required: false },
		intNumber: { type: Number, required: false },
		postalCode: { type: Number, required: false } }
});

module.exports = MONGOOSE.model('Client', ClientSchema);
