const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');

const sessionValidation = require('../middlewares/request.middleware.js').sessionValidation;

const router = express.Router();

router.use(authRouter);

router.use(sessionValidation);

router.use(userRouter);

module.exports = router;
