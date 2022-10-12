const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const AUTH_TOKEN = require('../services/authenticateToken.js');


const CLIENT = require(PATH.join(__dirname, '../controllers/client.js'));
const PET = require(PATH.join(__dirname, '../controllers/pet.js'));

/* Client Routes */
ROUTER.post('/create', AUTH_TOKEN, PET.CreatePet, CLIENT.CreateClient, PET.AddOwnerToPet);
ROUTER.post('/singup',  PET.CreatePet, CLIENT.SignUpClient, PET.AddOwnerToPet);
ROUTER.post('/Login',  CLIENT.LoginClient);
ROUTER.get('/', AUTH_TOKEN, CLIENT.GetClients);
ROUTER.get('/client', AUTH_TOKEN, CLIENT.GetClient);
ROUTER.post('/add-pet', AUTH_TOKEN, PET.CreatePet, CLIENT.AddPetToClient, PET.AddOwnerToPet);

module.exports = ROUTER;
