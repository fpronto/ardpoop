const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.get('/users', userCtrl.list);
router.post('/users', userCtrl.create);

module.exports = router;
