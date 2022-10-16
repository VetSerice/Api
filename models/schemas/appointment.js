const MONGOOSE = require('mongoose');
const SERVICE = require('./service.js');

var Schema = MONGOOSE.Schema;

const AppointmentSchema = new Schema({
	serviceid: { type: String, required: true },
	clientId: { type: String, required: true },
	veterinaryId: { type: String, required: true },
	petId: { type: String, required: true },
	hour: { type: String, required: true },
	done: { type: Boolean, default: false },
	free: { type: Boolean, default: true },
	notes: { type: String, default: null }
});

module.exports = AppointmentSchema;
