const Company = require('../../models/Company');
const User = require('../../models/User');

// @desc    Create a company
// @route   POST /api/companies
// @access  Private
const createCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      website,
      industry,
      size,
      founded,
      location,
      email,
      phone,
      socialMedia
    } = req.body;

    // Check if company exists
    const companyExists = await Company.findOne({ where: { name } });
    if (companyExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Company already exists'
      });
    }

    const company = await Company.create({
      name,
      description,
      website,
      industry,
      size,
      founded,
      location,
      email,
      phone,
      socialMedia: socialMedia || {},
      ownerId: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: { company }
    });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      status: 'success',
      data: { companies }
    });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
const getCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({
        status: 'error',
        message: 'Company not found'
      });
    }

    res.json({
      status: 'success',
      data: { company }
    });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update company
// @route   PUT /api/companies/:id
// @access  Private
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({
        status: 'error',
        message: 'Company not found'
      });
    }

    // Check if user owns the company
    if (company.ownerId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this company'
      });
    }

    await company.update(req.body);

    res.json({
      status: 'success',
      data: { company }
    });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Delete company
// @route   DELETE /api/companies/:id
// @access  Private
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({
        status: 'error',
        message: 'Company not found'
      });
    }

    if (company.ownerId !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this company'
      });
    }

    await company.destroy();

    res.json({
      status: 'success',
      message: 'Company deleted successfully'
    });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany
};
