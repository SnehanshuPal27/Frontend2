import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewEmpForm.css'; // Import CSS file

const ModifyEmpForm = ({EmpFormData,setEmpFormData}) => {
   const navigate=useNavigate()
    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     role: '',
    //     hireDate: '',
    //     salary: '' // Add salary field to formData
    //   });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpFormData({ ...EmpFormData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUserString = localStorage.getItem("currentUser");
        const currentUser = JSON.parse(currentUserString);
        // Perform form submission logic here (e.g., send data to server)
       
        
        // console.log(outputIndex)
        
        

        try {
            await axios.put(
                `http://localhost:3000/api/employees/${EmpFormData.EmployeeID}`,
                {
                    
        EmployeeName: EmpFormData.EmployeeName,
        EmployeeRole: EmpFormData.EmployeeRole,
        HireDate: EmpFormData.HireDate,
        Salary:EmpFormData.Salary,
        Password: EmpFormData.Password
                },
                {
                    headers: {
                        Authorization: currentUser.accessToken,
                        userRole: currentUser.role

                    }
                }
            );
            navigate("/EmployeeListAdmin")
        } catch (error) {
            console.error('Error creating reservation:', error);
            // Handle the error as needed
        }


    };
    return (
        <div className="form">
            <div className="form-toggle"></div>
            <div className="form-panel one">
                <div className="form-header">
                    <h1>Modify Employee</h1>
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="EmployeeName" value={EmpFormData.EmployeeName} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <input type="text" id="role" name="EmployeeRole" value={EmpFormData.EmployeeRole} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hiredate">Hire Date</label>
                            <input type="date" id="hiredate" name="HireDate" value={EmpFormData.HireDate} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary</label>
                            <input type="number" id="salary" name="Salary" value={EmpFormData.Salary} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="Email" value={EmpFormData.Email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="Password" name="Password" value={EmpFormData.Password} onChange={ handleChange} required />
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

export default ModifyEmpForm;
