import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewEmpForm.css'; // Import CSS file




const ModifySupplier = ({ supplierData, setSupplierData }) => {
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
        setSupplierData({ ...supplierData, [name]: value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
            // const expiryDateISOString = new Date(inventoryData.ExpiryDate).toISOString();
            await axios.put(
                `http://localhost:3000/api/suppliers/${supplierData.SupplierID}`,
                {
                    
                    SupplierName: supplierData.SupplierName,
                    SupplierAddress: supplierData.SupplierAddress,
                    ContactPerson: supplierData.ContactPerson,
                    ContactNumber: supplierData.ContactNumber

                },
                {
                    headers: {
                        Authorization: currentUser.accessToken,
                        userRole: currentUser.role
                    }
                }
            );
            navigate("/manageSuppliers")
        } catch (error) {
            console.error('Error adding to customers:', error);
            // Handle the error as needed
        }
    };

    console.log(supplierData)
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
                            <label htmlFor="name">Supplier Name</label>
                            <input type="text" id="MenuItemName" name="SupplierName" value={supplierData.SupplierName} onChange={handleChange} required />
                        </div>


                        <div className="form-group">
                            <label htmlFor="salary">Contact Number</label>
                            <input type="number" id="Price" name="ContactNumber" value={supplierData.ContactNumber} onChange={handleChange} required />
                        </div>

                        {/* <div className="form-group">
                            <label htmlFor="ExpiryDate">Expiry Date</label>
                            <input type="date" id="hiredate" name="ExpiryDate" value={getDateFromISOString(inventoryData.ExpiryDate)} onChange={handleChange} required />
                        </div> */}

                        <div className="form-group">
                            <label htmlFor="email">Contact Person</label>
                            <input type="text" id="ImageUrl" name="ContactPerson" value={supplierData.ContactPerson} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Address</label>
                            <input type="text" id="Category" name="SupplierAddress" value={supplierData.SupplierAddress} onChange={handleChange} required />
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

export default ModifySupplier;
