// backend/controllers/employeeController.js

const Employee = require('../models/employee');

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEmployee = async (req, res) => {
  const { fname, lname, email, phone, address } = req.body;
  const newEmployee = new Employee({ fname, lname, email, phone, address });
  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
};
