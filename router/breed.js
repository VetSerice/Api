const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const AUTH_TOKEN = require('../services/authenticateToken.js');

const BREED = require(PATH.join(__dirname, '../controllers/breed.js'));

ROUTER.post('/create', AUTH_TOKEN, BREED.CreateBreed);
ROUTER.get('/', AUTH_TOKEN, BREED.GetBreeds);
ROUTER.get('/find', AUTH_TOKEN, BREED.GetBreed);
ROUTER.post('/update', AUTH_TOKEN, BREED.UpdateBreeed);
ROUTER.get('/delete', AUTH_TOKEN, BREED.Deletebreed);

module.exports = ROUTER;
