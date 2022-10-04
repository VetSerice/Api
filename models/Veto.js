const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const Veto = mongoose.Schema({
  // username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: {type: String, required: true},
  clinic: {type: String, ref: 'Clinic', required: true
  },
  specializations: [{type: Schema.Types.ObjectId, ref: 'Specialization'
  }],
  receptions: [{type: Schema.Types.ObjectId, ref: 'Reception'
  }],
  createdAt: {type: Date, default: Date.now}
});

Veto.plugin(uniqueValidator);

module.exports = mongoose.model('veto', Veto);