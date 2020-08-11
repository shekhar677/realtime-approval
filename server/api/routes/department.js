const express = require('express');
const router = express.Router();

const depratmentController = require('../controllers/department');

router.post('/create', depratmentController.create_department);
router.get('/', depratmentController.all_department);

module.exports = router