import React, { useState } from 'react';
import './NewEmpForm.css'; // Import CSS file

const NewEmpForm = () => {
  // State variables for form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [salary, setSalary] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform actions like sending form data to a server
    // For now, let's just log the form data
    console.log({
      name,
      role,
      hireDate,
      salary,
      email,
      password
    });
    
    

  };

  return (
    <div className="form">
      <div className="form-toggle"></div>
      <div className="form-panel one">
        <div className="form-header">
          <h1>Employee Login</h1>
        </div>
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input type="text" id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="hiredate">Hire Date</label>
              <input type="date" id="hiredate" name="hiredate" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salary</label>
              <input type="number" id="salary" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-remember">
                <input type="checkbox" />
                Remember Me
              </label>
              <a className="form-recovery" href="#">Forgot Password?</a>
            </div>
            <div className="form-group">
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>
      </div>
      <div className="form-panel two">
        <div className="form-header">
          <h1>Register Account</h1>
        </div>
        <div className="form-content">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="cpassword">Confirm Password</label>
              <input type="password" id="cpassword" name="cpassword" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEmpForm;
