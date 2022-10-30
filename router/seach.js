const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const AUTH_TOKEN = require('../services/authenticateToken.js');

/* Require DaySchedule Module */
const APPOINTMENT = require(PATH.join(__dirname, '../controllers/appoitment.js'));


ROUTER.get('/ville', AUTH_TOKEN, APPOINTMENT.ville);
ROUTER.get('/shots', AUTH_TOKEN, APPOINTMENT.GetShots);


module.exports = ROUTER;
