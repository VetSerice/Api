const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const AUTH_TOKEN = require('../services/authenticateToken.js');
const VETERINARY = require(PATH.join(__dirname, '../controllers/veterinary.js'));
/* Client Routes */
ROUTER.post('/Signup',  VETERINARY.SignUpVeterinary);
ROUTER.post('/Login',  VETERINARY.LoginVeterinary);
ROUTER.post('/create',  VETERINARY.CreateVeterinary);

ROUTER.get('/all',  VETERINARY.GetVeterinarys);
//ROUTER.get('/appointment', AUTH_TOKEN, VETERINARY.GetvVterinaryappointment);
ROUTER.get('/veterinary', AUTH_TOKEN, VETERINARY.GetVeto);
ROUTER.get('/valider', AUTH_TOKEN, VETERINARY.Validate);
ROUTER.post('/update/vet/', VETERINARY.UpdateVeto);
ROUTER.post('/BreakHours',  VETERINARY.CreateBreakDay);
ROUTER.get('/MYBreakHours/',  VETERINARY.GetDaybreakhours);
ROUTER.post('/MYBreakHours/vet/',  VETERINARY.CreateBreakDayVeto);
module.exports = ROUTER;
