const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api';

async function createTestData() {
  try {
    // First register a user
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      email: 'company@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Smith'
    });

    const token = registerResponse.data.data.token;

    // Create a company
    const companyResponse = await axios.post(
      `${BASE_URL}/companies`,
      {
        name: 'TechCorp Kenya',
        description: 'Leading technology company in East Africa',
        website: 'https://techcorp.co.ke',
        industry: 'Technology',
        size: '51-200',
        founded: '2015',
        location: 'Nairobi, Kenya'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('✅ Company created:', companyResponse.data.data.company.name);

    // Create some jobs
    const jobs = [
      {
        title: 'Senior React Developer',
        company: 'TechCorp Kenya',
        description: 'Build amazing web applications with React and TypeScript',
        requirements: '5+ years React, TypeScript, Node.js',
        location: 'Nairobi, Kenya',
        type: 'full-time',
        salary: 'KES 150,000 - 200,000',
        skills: ['React', 'TypeScript', 'Node.js']
      },
      {
        title: 'DevOps Engineer',
        company: 'TechCorp Kenya',
        description: 'Manage cloud infrastructure and CI/CD pipelines',
        requirements: 'AWS, Docker, Kubernetes experience',
        location: 'Remote',
        type: 'remote',
        salary: 'KES 180,000 - 250,000',
        skills: ['AWS', 'Docker', 'Kubernetes']
      },
      {
        title: 'UX/UI Designer',
        company: 'TechCorp Kenya',
        description: 'Design beautiful user interfaces for our products',
        requirements: 'Figma, Adobe XD, design systems',
        location: 'Nairobi, Kenya',
        type: 'full-time',
        salary: 'KES 100,000 - 150,000',
        skills: ['Figma', 'Adobe XD', 'UI Design']
      }
    ];

    for (const job of jobs) {
      const jobResponse = await axios.post(
        `${BASE_URL}/jobs`,
        job,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('✅ Job created:', jobResponse.data.data.job.title);
    }

    console.log('🎉 All test data created successfully!');
  } catch (error) {
    console.error('Error creating test data:', error.response?.data || error.message);
  }
}

createTestData();
