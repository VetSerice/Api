const MONGOOSE = require('mongoose');

var Schema = MONGOOSE.Schema;

var VETHEADSchema = new Schema({
    name: { type: String, required: false },
    code: { type: Number, required: false },

});

module.exports = VETHEADSchema;
