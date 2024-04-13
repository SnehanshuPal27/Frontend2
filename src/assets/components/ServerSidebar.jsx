import React from 'react';
import "./sidebar.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ServerSidebar = () => {
    const navigate=useNavigate()
    const handleLogout=()=>{
       localStorage.removeItem("currentUser");
       console.log("in handle logout")
       navigate("/")
    }
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Sidebar</h3>
            </div>

            <ul className="list-unstyled components">
                
                
                <li>
                <Link to="/placeOrder">Take Orders </Link>
                </li>
                
                <li>
                    <Link to="/manageReadyItemsAll"> Serve Orders</Link>
                </li>
                <li>
                    <Link to ="/manageReservation"> Manage Reservations</Link>
                </li>
                <li>
                    <a href="#">My profile</a>
                </li>
                <li>
                <a> <button onClick={handleLogout}> Logout </button> </a>
                </li>
            </ul>
        </nav>
    );
};

export default ServerSidebar;
