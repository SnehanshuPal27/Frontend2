import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewEmpForm.css'; // Import CSS file




const ModifyCustomer = ({customerData,setCustomerData}) => {
    // const [inventoryData, setInventoryData] = useState({

    //     SupplierID: '',
    //     ItemName: '',
    //     Category: '',
    //     Quantity: '',
    //     ExpiryDate: ''

    // });
    const navigate = useNavigate()
    // console.log(MenuData)

    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
            // const expiryDateISOString = new Date(inventoryData.ExpiryDate).toISOString();
            await axios.put(
                `http://localhost:3000/api/customers/${customerData.CustomerID}`,
                {
                    CustomerID: customerData.CustomerID,
                    CustomerName: customerData.CustomerName,
                    ContactNumber: customerData.ContactNumber,
                    Email: customerData.Email,
                    Address: customerData.Address

                },
                {
                    headers: {
                        Authorization: currentUser.accessToken,
                        userRole: currentUser.role
                    }
                }
            );
            navigate("/manageCustomers")
        } catch (error) {
            console.error('Error adding to customers:', error);
            // Handle the error as needed
        }
    };
    return (
        <div className="form">
            <div className="form-toggle"></div>
            <div className="form-panel one">
                <div className="form-header">
                    <h1> Modify Customer Data</h1>
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Customer Name</label>
                            <input type="text" id="MenuItemName" name="CustomerName" value={customerData.CustomerName} onChange={handleChange} required />
                        </div>


                        <div className="form-group">
                            <label htmlFor="salary">Contact Number</label>
                            <input type="number" id="Price" name="ContactNumber" value={customerData.ContactNumber} onChange={handleChange} required />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="ExpiryDate">Expiry Date</label>
                            <input type="date" id="hiredate" name="ExpiryDate" value={getDateFromISOString(inventoryData.ExpiryDate)} onChange={handleChange} required />
                        </div> */}

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="ImageUrl" name="Email" value={customerData.Email} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Address</label>
                            <input type="text" id="Category" name="Address" value={customerData.Address} onChange={handleChange} required />
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

export default ModifyCustomer;
