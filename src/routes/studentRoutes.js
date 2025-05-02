const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/auth');

// All routes are protected
router.use(authenticateToken);

router.post('/', studentController.createRegistration);
router.get('/', studentController.getRegistrations);
router.get('/:id', studentController.getRegistration);
router.put('/:id', studentController.updateRegistration);
router.delete('/:id', studentController.deleteRegistration);

module.exports = router;
