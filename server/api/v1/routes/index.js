const express = require('express');
const path = require('path');
const poopRouter = require('./poop.router');
const webPoopRouter = require('./webPoop.router');

const router = express.Router();

router.use(poopRouter);

router.use(webPoopRouter);

module.exports = router;
