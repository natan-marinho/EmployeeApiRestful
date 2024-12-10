const express = require('express');
const departmentsRoute = require('../api/departments/departmentsRoute');
const employeesRoute = require('../api/employees/employeesRoute');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use(express.json());
app.use('/departments', departmentsRoute);
app.use('/employees', employeesRoute);

module.exports = app;
