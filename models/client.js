const MONGOOSE = require('mongoose');
const ADDRESS = require('./schemas/address.js');

var Schema = MONGOOSE.Schema;

var ClientSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	phone: { type: Number, required: true },
	pets: { type: [MONGOOSE.ObjectId], required: true },
	address: {
		street: { type: String, required: false },
		number: { type: Number, required: false },
		intNumber: { type: Number, required: false },
		postalCode: { type: Number, required: false } }
});

module.exports = MONGOOSE.model('Client', ClientSchema);
