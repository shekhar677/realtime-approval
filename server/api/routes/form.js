const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');

const formController = require('../controllers/form');

router.post('/create', checkAuth, formController.createForm);
router.get('/', checkAuth, formController.getAllForms);
router.post('/:formId/:status', checkAuth, formController.updateStatus);
router.get('/user/:userId', checkAuth, formController.getFormsCreatedByUser);
router.get('/assigned/:userId', checkAuth, formController.getFormsAssignedToUser);
router.get('/:departmentId', checkAuth, formController.getForms);

module.exports = router;