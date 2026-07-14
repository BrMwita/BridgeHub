const { Op } = require('sequelize');
const Job = require('../../models/Job');
const Application = require('../../models/Application');

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      requirements,
      location,
      type,
      salary,
      experience,
      skills,
      expiresAt
    } = req.body;

    if (!title || !company || !description || !requirements || !location) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields'
      });
    }

    const job = await Job.create({
      title,
      company,
      description,
      requirements,
      location,
      type: type || 'full-time',
      salary,
      experience,
      skills: skills || [],
      postedBy: req.user.id,
      expiresAt: expiresAt || null
    });

    res.status(201).json({
      status: 'success',
      data: { job }
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, type, location } = req.query;
    const offset = (page - 1) * limit;

    let where = { status: 'active' };

    if (search) {
      where = {
        ...where,
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { company: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (type) where.type = type;
    if (location) where.location = { [Op.iLike]: `%${location}%` };

    const jobs = await Job.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      status: 'success',
      data: {
        jobs: jobs.rows,
        total: jobs.count,
        page: parseInt(page),
        totalPages: Math.ceil(jobs.count / limit)
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    await job.increment('views');

    res.json({
      status: 'success',
      data: { job }
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    if (job.postedBy !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this job'
      });
    }

    await job.update(req.body);

    res.json({
      status: 'success',
      data: { job }
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    if (job.postedBy !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this job'
      });
    }

    await job.destroy();

    res.json({
      status: 'success',
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Apply for a job
// @route   POST /api/jobs/:id/apply
// @access  Private
const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    const existingApplication = await Application.findOne({
      where: { jobId, userId }
    });

    if (existingApplication) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already applied for this job'
      });
    }

    const { coverLetter } = req.body;

    const application = await Application.create({
      jobId,
      userId,
      coverLetter: coverLetter || null,
      status: 'pending'
    });

    await job.increment('applications');

    res.status(201).json({
      status: 'success',
      data: { application }
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get user's applications
// @route   GET /api/jobs/applications/me
// @access  Private
const getMyApplications = async (req, res) => {
  try {
    console.log('📝 Getting applications for user:', req.user.id);
    
    // Simple query first - just get applications
    const applications = await Application.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    console.log('📊 Found applications:', applications.length);

    // If no applications, return empty array
    if (applications.length === 0) {
      return res.json({
        status: 'success',
        data: { applications: [] }
      });
    }

    // Get job details for each application
    const applicationsWithJobs = [];
    for (const app of applications) {
      try {
        const job = await Job.findByPk(app.jobId);
        applicationsWithJobs.push({
          ...app.toJSON(),
          job: job ? job.toJSON() : null
        });
      } catch (err) {
        console.error('Error fetching job for application:', err);
        applicationsWithJobs.push({
          ...app.toJSON(),
          job: null
        });
      }
    }

    res.json({
      status: 'success',
      data: { 
        applications: applicationsWithJobs 
      }
    });
  } catch (error) {
    console.error('❌ Get applications error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get jobs posted by user
// @route   GET /api/jobs/my-jobs
// @access  Private
const getMyJobs = async (req, res) => {
  try {
    console.log('📝 Getting jobs for user:', req.user.id);
    
    const jobs = await Job.findAll({
      where: { postedBy: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    console.log('📊 Found jobs:', jobs.length);
    
    res.json({
      status: 'success',
      data: { jobs: jobs || [] }
    });
  } catch (error) {
    console.error('❌ Get my jobs error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  applyForJob,
  getMyApplications,
  getMyJobs
};
