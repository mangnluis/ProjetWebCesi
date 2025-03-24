const express = require('express');
const router = express.Router();
const entrepriseController = require('../controllers/entrepriseController');

// Route to create a new entreprise
router.post('/', entrepriseController.createEntreprise);

// Route to get all entreprises
router.get('/', entrepriseController.getAllEntreprises);

// Route to get a specific entreprise by ID
router.get('/:id', entrepriseController.getEntrepriseById);

// Route to update an entreprise by ID
router.put('/:id', entrepriseController.updateEntreprise);

// Route to delete an entreprise by ID
router.delete('/:id', entrepriseController.deleteEntreprise);

module.exports = router;