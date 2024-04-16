import React from 'react';
import "./sidebar.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ChefSidebar = ({dashLink,setDashLink}) => {
    const navigate=useNavigate()
    const handleLogout=()=>{
       setDashLink("/")  
       localStorage.removeItem("currentUser");
       console.log("in handle logout")
       navigate("/")
    }
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Welcome {currentUser.name}</h3>
            </div>

            <ul className="list-unstyled components">
                
                
                <li>
                <Link to="/manageMenu">Manage Menu </Link>
                </li>
                
                <li>
                    <Link to="/manageOrderItemsAll">Process Orders</Link>
                </li>
                <li>
                <Link to="/manageIngridients">Manange Ingredients</Link>
                </li>
                <li>
                <Link to="/profile">View Profile</Link>
                </li>
                <li>
                <a> <button onClick={handleLogout}> Logout </button> </a>
                </li>
            </ul>
        </nav>
    );
};

export default ChefSidebar;
