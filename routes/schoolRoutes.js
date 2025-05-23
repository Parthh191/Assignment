const express = require('express');
const SchoolController = require('../controllers/SchoolController');

const router = express.Router();

// Route for adding a new school
router.post('/addSchool', SchoolController.addSchool);

// Route for listing schools sorted by proximity
router.get('/listSchools', SchoolController.listSchools);

module.exports = router;