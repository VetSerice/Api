const EXPRESS = require('express');
const multer = require('multer');

const ROUTER = EXPRESS.Router();
const PATH = require('path');
const AUTH_TOKEN = require('../services/authenticateToken.js');

/* Require Controller Modules */
const PET = require(PATH.join(__dirname, '../controllers/pet.js'));

/* Pet Routes */
ROUTER.get('/', AUTH_TOKEN, PET.GetPet); /* Should be /find */
ROUTER.get('/all', AUTH_TOKEN, PET.GetPets); /* Should be / */
ROUTER.post('/add-vaccination-record', AUTH_TOKEN, PET.AddVaccinationRecord);
ROUTER.post('/upload-picture', multer().any(),AUTH_TOKEN, PET.UploadProfilePicture);
ROUTER.get('/picture', AUTH_TOKEN, PET.GetProfilePicture);

module.exports = ROUTER;
