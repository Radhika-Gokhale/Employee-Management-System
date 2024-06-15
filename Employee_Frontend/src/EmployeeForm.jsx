import { useState, useEffect } from 'react';
import axios from 'axios';
import "./EmployeeForm.css";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fname) newErrors.fname = 'First name is required';
    if (!formData.lname) newErrors.lname = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await axios.post('http://localhost:5000/employees', formData);
      fetchEmployees();
      setFormData({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="form-card">
          <h1 className="employ-heading">Employee Form</h1>
          <form onSubmit={handleSubmit} className="form-box">
            <div className="form-group">
              <label htmlFor="fname">First Name : </label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="Enter the first name"
                className="form-input"
              />
              {errors.fname && <span className="error">{errors.fname}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name : </label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Enter the last name"
                className="form-input"
              />
              {errors.lname && <span className="error">{errors.lname}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email : </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter the email"
                className="form-input"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone : </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter the phone number"
                className="form-input"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address : </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter the address"
                className="form-input"
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
            <button type="submit" className="submitBtn">Add Employee</button>
          </form>
        </div>
       

<div className="employee-table-card">
  <table className="employee-table">
    <thead>
      <tr>
      <th>Sr. No.</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee, index) => (
        <tr key={employee._id} className="employee-row">
           <td>{index + 1}</td>
          <td>{employee.fname}</td>
          <td>{employee.lname}</td>
          <td>{employee.email}</td>
          <td>{employee.phone}</td>
          <td>{employee.address}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default EmployeeForm;
