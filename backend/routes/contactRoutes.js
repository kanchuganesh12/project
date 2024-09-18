const express = require('express');
const { submitContactForm,getContactForms } = require('../controllers/contactController');
const router = express.Router();

// Route to handle contact form submission
router.post('/', submitContactForm);
router.get('/', getContactForms);

module.exports = router;
