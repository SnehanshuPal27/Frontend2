import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './NewEmpForm.css'; // Import CSS file

const NewMenuFormAdd = () => {
    const [MenuData, setMenuData] = useState({
        MenuItemID: '',
        MenuItemName: '',
        Description: '',
        Category: '',
        Price: '',
        ImageUrl: '',
        
      });
      const navigate=useNavigate()
      console.log(MenuData)
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setMenuData({ ...MenuData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
            console.log(MenuData)
            await axios.post(
              `http://localhost:3000/api/menu/`,
              {
                MenuItemName: MenuData.MenuItemName,
                Price: MenuData.Price,
                Category: MenuData.Category,
                ImageUrl: MenuData.ImageUrl,
                Description:MenuData.Description
                
              },
              {
                headers: {
                  Authorization: currentUser.accessToken,
                  userRole: currentUser.role
                }
              }
            );
            navigate("/manageMenu")
          } catch (error) {
            console.error('Error adding to menu:', error);
            // Handle the error as needed
          }
      };
    return (
        <div className="form">
            <div className="form-toggle"></div>
            <div className="form-panel one">
                <div className="form-header">
                    <h1>Add to Menu</h1>
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="MenuItemName" name="MenuItemName" value={MenuData.MenuItemName} onChange={ handleChange} required />
                        </div>
                       
                        
                        <div className="form-group">
                            <label htmlFor="salary">Price</label>
                            <input type="number" id="Price" name="Price" value={MenuData.Price} onChange={ handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Category</label>
                            <input type="text" id="Category" name="Category" value={MenuData.Category} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Description</label>
                            <input type="text" id="Category" name="Description" value={MenuData.Description} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">ImageUrl</label>
                            <input type="text" id="ImageUrl" name="ImageUrl" value={MenuData.ImageUrl} onChange={handleChange} required />
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

export default NewMenuFormAdd;
