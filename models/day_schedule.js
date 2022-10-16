const MONGOOSE = require('mongoose');
const APPOINTMENT = require('./schemas/appointment.js');

var Schema = MONGOOSE.Schema;

const DayScheduleSchema = new Schema({
	date: { type: String, required: true },
	veterinaryId: { type: String, required: true },
	appointments: { type: [MONGOOSE.ObjectId], required: true }
});

module.exports = MONGOOSE.model('DaySchedule', DayScheduleSchema);
