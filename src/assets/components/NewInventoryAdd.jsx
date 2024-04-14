import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewEmpForm.css'; // Import CSS file

const NewInventoryAdd = () => {
    const [inventoryData, setInventoryData] = useState({

        SupplierID: '',
        ItemName: '',
        Category: '',
        Quantity: '',
        ExpiryDate: ''

    });
    const navigate = useNavigate()
    // console.log(MenuData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData({ ...inventoryData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
         
            await axios.post(
                `http://localhost:3000/api/inventory/`,
                {
                    SupplierID: inventoryData.SupplierID,
                    ItemName: inventoryData.ItemName,
                    Category: inventoryData.Category,
                    Quantity: inventoryData.Quantity,
                    ExpiryDate: inventoryData.ExpiryDate

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
                            <input type="date" id="hiredate" name="ExpiryDate" value={inventoryData.ExpiryDate} onChange={handleChange} required />
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

export default NewInventoryAdd;
