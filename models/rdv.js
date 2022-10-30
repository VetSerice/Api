const MONGOOSE = require('mongoose');

var Schema = MONGOOSE.Schema;

const AppointmentSchema = new Schema({
    patient: {
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    specialisation: {
        type: String,
        ref: "Department",
        required: true,
    },
    doctor: {
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    disease: {
        type: MONGOOSE.Schema.Types.ObjectId,
        ref: "Disease",
        default: null,
    },
    appointmentDate: {
        type: String,
        required: true,
    },
    appointmentStatus: {
        type: String,
        enum: ["pending", "open", "rejected", "cancelled", "completed"],
        required: true,
    },
});


module.exports = MONGOOSE.model('Rdv', AppointmentSchema);
