const express = require('express');
const {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companies/companyController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCompanies);
router.get('/:id', getCompany);
router.post('/', protect, createCompany);
router.put('/:id', protect, updateCompany);
router.delete('/:id', protect, deleteCompany);

module.exports = router;
