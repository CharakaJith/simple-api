const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the databse
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: process.env.PG_HOST,
    dialect: config.dialect,
    pool: {
      max: parseInt(process.env.PG_MAXCONN),
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit();
  });

// routes
const user = require('./routes/user.routes');

app.use('/api/users', user);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PORT: ${process.env.PORT} - MODE: ${process.env.NODE_ENV}`);
});
