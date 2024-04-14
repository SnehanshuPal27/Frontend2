import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewEmpForm.css'; // Import CSS file




const ModifyIngridients = ({ingridientData,setIngridientData}) => {
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
        setIngridientData({ ...ingridientData, [name]: value });
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
            // const expiryDateISOString = new Date(inventoryData.ExpiryDate).toISOString();
            await axios.put(
                `http://localhost:3000/api/menu/ing/${ingridientData.MenuItemID}/${ingridientData.InventoryID}`,
                {
                  Quantity:ingridientData.Quantity

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
                    <h1> Modify Ingredient Amount</h1>
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Quantity</label>
                            <input type="text" id="MenuItemName" name="Quantity" value={ingridientData.Quantity} onChange={handleChange} required />
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

export default ModifyIngridients;
