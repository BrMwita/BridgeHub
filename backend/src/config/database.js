const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
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
    await sequelize.sync({ alter: true });
    console.log('✅ Database Synced');
  } catch (error) {
    console.error('❌ Database Error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
