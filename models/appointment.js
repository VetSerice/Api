const MONGOOSE = require('mongoose');

var Schema = MONGOOSE.Schema;

const AppointmentSchema = new Schema({
	serviceid: { type: String, required: true },
	clientId: { type: String, required: true },
	veterinaryId: { type: String, required: true },
	done: { type: Boolean, default: false },
	hour: { type: String, required: true},
	petId: { type: String, required: true },
	notes: { type: String, default: null },

});

module.exports = MONGOOSE.model('Appointment', AppointmentSchema);
