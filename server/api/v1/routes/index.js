const express = require('express');
const poopRouter = require('./poop.router');

const router = express.Router();

router.use(poopRouter);

module.exports = router;
