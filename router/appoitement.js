const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const AUTH_TOKEN = require('../services/authenticateToken.js');

/* Require DaySchedule Module */
const APPOINTMENT = require(PATH.join(__dirname, '../controllers/appoitment.js'));


ROUTER.post('/', AUTH_TOKEN, APPOINTMENT.DaySchedule);
ROUTER.post('/add-appointment', AUTH_TOKEN, APPOINTMENT.AddAppointment);
ROUTER.post('/update-appointments', AUTH_TOKEN, APPOINTMENT.UpdateAppointment);
module.exports = ROUTER;
