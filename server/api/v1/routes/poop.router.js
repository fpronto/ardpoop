const express = require('express');
const poopCtrl = require('../controllers/poop.controller');

const router = express.Router();

router.get('/poop', poopCtrl.poop);

router.get('/close', poopCtrl.close);

router.get('/open', poopCtrl.open);

router.get('/smell', poopCtrl.smell);

router.get('/user', poopCtrl.user);


module.exports = router;
