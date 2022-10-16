const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const AUTH_TOKEN = require('../services/authenticateToken.js');

/* Require DaySchedule Module */
const DAY_SCHEDULE = require(PATH.join(__dirname, '../controllers/schedule.js'));

/* DaySchedule Routes */
ROUTER.post('/', AUTH_TOKEN, DAY_SCHEDULE.DaySchedule);
ROUTER.post('/add-appointment', AUTH_TOKEN, DAY_SCHEDULE.AddAppointments);
ROUTER.post('/update-appointments', AUTH_TOKEN, DAY_SCHEDULE.UpdateAppointment);
ROUTER.get('/daywork', AUTH_TOKEN, DAY_SCHEDULE.DayworkVet);
//ROUTER.get('/daywork', AUTH_TOKEN, DAY_SCHEDULE.GEtVetoAppoitment);
ROUTER.get('/client', AUTH_TOKEN, DAY_SCHEDULE.GetClientAppoitment);


module.exports = ROUTER;
