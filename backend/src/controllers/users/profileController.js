const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id }
    });

    if (!profile) {
      return res.status(404).json({
        status: 'error',
        message: 'Profile not found'
      });
    }

    res.json({
      status: 'success',
      data: { profile }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      bio,
      phone,
      location,
      website,
      github,
      linkedin,
      twitter,
      skills,
      experience,
      education,
      availability
    } = req.body;

    const profile = await Profile.findOne({
      where: { userId: req.user.id }
    });

    if (!profile) {
      return res.status(404).json({
        status: 'error',
        message: 'Profile not found'
      });
    }

    await profile.update({
      firstName: firstName || profile.firstName,
      lastName: lastName || profile.lastName,
      bio: bio || profile.bio,
      phone: phone || profile.phone,
      location: location || profile.location,
      website: website || profile.website,
      github: github || profile.github,
      linkedin: linkedin || profile.linkedin,
      twitter: twitter || profile.twitter,
      skills: skills || profile.skills,
      experience: experience || profile.experience,
      education: education || profile.education,
      availability: availability || profile.availability
    });

    // Update user email if needed
    if (req.body.email) {
      await User.update(
        { email: req.body.email },
        { where: { id: req.user.id } }
      );
    }

    res.json({
      status: 'success',
      data: { profile }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
