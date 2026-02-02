const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// list all packages
router.get('/', packageController.getAllPackages);

// single package
router.get('/:id', packageController.getPackageById);

// routes for a package
router.get('/:id/routes', packageController.getPackageRoutes);

module.exports = router;
