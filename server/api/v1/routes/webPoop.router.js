const express = require('express');
const webPoopCtrl = require('../controllers/webPoop.controller');
const middleware = require('../middlewares/request.middleware');

const router = express.Router();

router.get('/top', webPoopCtrl.top);

router.get('/status', webPoopCtrl.status);

router.get('/toxicity', webPoopCtrl.toxicity);

router.put('/session/:id/owner', middleware.verifySession, middleware.verifyData, webPoopCtrl.setOwner);


module.exports = router;
