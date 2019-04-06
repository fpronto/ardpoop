const express = require('express');
const webPoopCtrl = require('../controllers/webPoop.controller');

const router = express.Router();

router.get('/top', webPoopCtrl.top);

router.get('/status', webPoopCtrl.status);

router.get('/toxicity', webPoopCtrl.toxicity);

module.exports = router;
