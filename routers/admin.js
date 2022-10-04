const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/:id', adminController.getOneAdmin);

module.exports = router;