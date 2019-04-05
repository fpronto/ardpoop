const express = require('express');
const poopCtrl = require('../controllers/poop.controller');

const router = express.Router();

router.get('/poop', poopCtrl.poop);

module.exports = router;
