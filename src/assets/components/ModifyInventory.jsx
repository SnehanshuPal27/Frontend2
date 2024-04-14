import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewEmpForm.css'; // Import CSS file

function getDateFromISOString(isoString) {
    // Check if the isoString is in yyyy-mm-dd format
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (regex.test(isoString)) {
        return isoString; // Return the date as is
    }
    
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}



const ModifyInventory = ({customerData,setCustomerData}) => {
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
        // console.log(inventoryData) 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
            // const expiryDateISOString = new Date(inventoryData.ExpiryDate).toISOString();
            await axios.put(
                `http://localhost:3000/api/inventory/${customerData.InventoryID}`,
                {
                    CustomerName: c ,
    ContactNumber: '',
    Email: '',
    Address: ''

                },
                {
                    headers: {
                        Authorization: currentUser.accessToken,
                        userRole: currentUser.role
                    }
                }
            );
            navigate("/manageInventory")
        } catch (error) {
            console.error('Error adding to inventory:', error);
            // Handle the error as needed
        }
    };
    return (
        <div className="form">
            <div className="form-toggle"></div>
            <div className="form-panel one">
                <div className="form-header">
                    <h1>Add to Inventory</h1>
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Item Name</label>
                            <input type="text" id="MenuItemName" name="ItemName" value={inventoryData.ItemName} onChange={handleChange} required />
                        </div>


                        <div className="form-group">
                            <label htmlFor="salary">Quantity</label>
                            <input type="number" id="Price" name="Quantity" value={inventoryData.Quantity} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ExpiryDate">Expiry Date</label>
                            <input type="date" id="hiredate" name="ExpiryDate" value={getDateFromISOString(inventoryData.ExpiryDate)} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Category</label>
                            <input type="text" id="ImageUrl" name="Category" value={inventoryData.Category} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Supplier ID</label>
                            <input type="text" id="Category" name="SupplierID" value={inventoryData.SupplierID} onChange={handleChange} required />
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

export default ModifyInventory;
