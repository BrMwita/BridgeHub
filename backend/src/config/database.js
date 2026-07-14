const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use DATABASE_URL from environment
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected Successfully');
    
    // Only sync in development, use migrations in production
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database Synced');
    } else {
      console.log('✅ Database ready (production mode)');
    }
  } catch (error) {
    console.error('❌ Database Error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
