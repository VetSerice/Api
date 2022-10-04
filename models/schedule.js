const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const schedule = mongoose.Schema({
  // username: { type: String, required: true },
  date: {type: Date}, dayOfWeek: {type: Number}, interval: {type: Number, required: true},
  doctor: {type: Schema.Types.ObjectId, ref: 'Veto', required: true}, startTime: {type: Date, required: true
  },
  endTime: {type: Date, required: true},
  receptions: [{type: Schema.Types.ObjectId, ref: 'Reception'}],
  description: {type: String},
  createdAt: {type: Date, default: Date.now}});

schedule.plugin(uniqueValidator);

module.exports = mongoose.model('schedule', schedule);