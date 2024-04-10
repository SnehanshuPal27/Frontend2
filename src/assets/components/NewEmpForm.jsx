import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewEmpForm.css'; // Import CSS file

const NewEmpForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        hireDate: '',
        salary: '' // Add salary field to formData
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/api/auth/signup/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          const data = await response.json();
          console.log('API response:', data);
          
          // Add any further logic based on the API response
        } catch (error) {
          console.error('Error:', error);
        }
      };
    return (
        <div className="form">
            <div className="form-toggle"></div>
            <div className="form-panel one">
                <div className="form-header">
                    <h1>Register Employee</h1>
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <input type="text" id="role" name="role" value={formData.role} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hiredate">Hire Date</label>
                            <input type="date" id="hiredate" name="hireDate" value={formData.hireDate} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary</label>
                            <input type="number" id="salary" name="salary" value={formData.salary} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            
                            <a className="form-recovery" href="#">Forgot Password?</a>
                        </div>
                        <div className="form-group">
                            <button type="submit"> Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="form-panel two">
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
            </div> */}
        </div>
    );
};

export default NewEmpForm;
