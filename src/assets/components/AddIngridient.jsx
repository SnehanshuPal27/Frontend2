import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewEmpForm.css'; // Import CSS file

const AddIngridient = () => {
    const [ingridientData, setIngridientData] = useState({
        MenuItemID: '',
    InventoryID: '',
    Quantity: ''
        
    
      });  
    const navigate = useNavigate()
    // console.log(MenuData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIngridientData({ ...ingridientData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
         
            await axios.post(
                `http://localhost:3000/api/menu/ingridientAdd`,
                {
                    
                    MenuItemID: ingridientData.MenuItemID,
                    InventoryID: ingridientData.InventoryID,
                    Quantity: ingridientData.Quantity

                },
                {
                    headers: {
                        Authorization: currentUser.accessToken,
                        userRole: currentUser.role
                    }
                }
            );
            navigate("/manageIngridients")
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
                    <h1>Add Ingridients</h1>
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Menu Item ID</label>
                            <input type="text" id="MenuItemID" name="MenuItemID" value={ingridientData.MenuItemID} onChange={handleChange} required />
                        </div>


                        <div className="form-group">
                            <label htmlFor="salary">Inventory ID</label>
                            <input type="number" id="Price" name="InventoryID" value={ingridientData.InventoryID} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ExpiryDate">Quantity</label>
                            <input type="number" id="hiredate" name="Quantity" value={ingridientData.Quantity} onChange={handleChange} required />
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

export default AddIngridient;
