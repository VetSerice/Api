const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const specialization = mongoose.Schema({

  name: {type: String, required: true},
  description: {type: String, required: true},
  tags: {type: [String], required: true},
  createdAt: {type: Date, default: Date.now
  }

});

specialization.plugin(uniqueValidator);
//specialization.index({name: 1});

module.exports = mongoose.model('Admin', specialization);