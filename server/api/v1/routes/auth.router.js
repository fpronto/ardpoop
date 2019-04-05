const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const authValidator = require('../validators/auth.validator');

const router = express.Router();

router.post('/signin', authValidator.signin, authCtrl.signin);
router.post('/refresh-token', authValidator.refreshToken, authCtrl.refreshToken);
router.post('/refresh-token/revoke', authValidator.revokeRefreshToken, authCtrl.revokeRefreshToken);

module.exports = router;
