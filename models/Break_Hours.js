const MONGOOSE = require('mongoose');


var Schema = MONGOOSE.Schema;

const BreakHoursSchema = new Schema({
    day: {
        dayname:{ type: String, required: true },
        Starttime: { type: String, required: true },
        endTime: { type: String, required: true },
    },

});
module.exports = MONGOOSE.model('BreakHours', BreakHoursSchema);