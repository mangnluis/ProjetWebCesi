const Entreprise = require('../models/Entreprise');

// Create a new entreprise
exports.createEntreprise = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const newEntreprise = new Entreprise({ name, email, phone, address });
        await newEntreprise.save();
        res.status(201).json({ message: 'Entreprise created successfully', entreprise: newEntreprise });
    } catch (error) {
        res.status(500).json({ message: 'Error creating entreprise', error: error.message });
    }
};

// Get all entreprises
exports.getAllEntreprises = async (req, res) => {
    try {
        const entreprises = await Entreprise.find();
        res.status(200).json(entreprises);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entreprises', error: error.message });
    }
};

// Get entreprise by ID
exports.getEntrepriseById = async (req, res) => {
    try {
        const entreprise = await Entreprise.findById(req.params.id);
        if (!entreprise) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }
        res.status(200).json(entreprise);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entreprise', error: error.message });
    }
};

// Update entreprise by ID
exports.updateEntreprise = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const updatedEntreprise = await Entreprise.findByIdAndUpdate(req.params.id, { name, email, phone, address }, { new: true });
        if (!updatedEntreprise) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }
        res.status(200).json({ message: 'Entreprise updated successfully', entreprise: updatedEntreprise });
    } catch (error) {
        res.status(500).json({ message: 'Error updating entreprise', error: error.message });
    }
};

// Delete entreprise by ID
exports.deleteEntreprise = async (req, res) => {
    try {
        const deletedEntreprise = await Entreprise.findByIdAndDelete(req.params.id);
        if (!deletedEntreprise) {
            return res.status(404).json({ message: 'Entreprise not found' });
        }
        res.status(200).json({ message: 'Entreprise deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting entreprise', error: error.message });
    }
};