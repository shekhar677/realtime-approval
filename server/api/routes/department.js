const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');

const depratmentController = require('../controllers/department');

router.post('/create', checkAuth, depratmentController.create_department);
router.get('/', checkAuth, depratmentController.all_department);

module.exports = router